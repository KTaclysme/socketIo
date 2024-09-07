import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.utils';
import { createMessage } from '../controllers/messages.controller';
import { getUserByName, updateUser, getUserNameById } from '../controllers/users.controller';

export default function setupSocketIO(io: Server) {
    io.use(async (socket: Socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
            socket.data.userId = decoded.id;
            next();
        } catch (err) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', async (socket: Socket) => {
        console.log(`Utilisateur connecté : ${socket.data.userId}`);

        const userId = socket.data.userId;
        try {
            await updateUser(userId, socket.id); 
            console.log(`Socket ID mis à jour : ${socket.id}`);
        } catch (error) {
            console.log("Erreur lors de la mise à jour du socketId:", error);
        }

        socket.on('sendMessage', async (data: { body: string }) => {
            const userFrom = socket.data.userId;
            const msg = data.body.trim();
        
            console.log(`Message reçu: '${msg}'`); 
        
            try {
                const userNameFrom = await getUserNameById(userFrom);

                if (msg.startsWith('@')) {
                    console.log("Message détecté comme mention d'utilisateur");
        
                    const spaceIndex = msg.indexOf(' ');
                    if (spaceIndex === -1) {
                        console.error('Format de message invalide, aucun espace trouvé après le @username.');
                        return;
                    }
        
                    const userName = msg.substring(1, spaceIndex).trim(); 
                    const messageBody = msg.substring(spaceIndex + 1).trim();
        
                    console.log(`Utilisateur mentionné: ${userName}, Message: ${messageBody}`);
        
                    const user = await getUserByName(userName);
        
                    if (user) {
                        console.log(`Utilisateur trouvé: ${userName}, socketId: ${user.sockerId}`);
        
                        if (!user.sockerId) {
                            console.error('Socket ID non trouvé pour l\'utilisateur:', userName);
                            return;
                        }
        
                        const message = await createMessage({
                            body: messageBody,
                            userFrom: userFrom,
                            userTo: user.id
                        });
        
                        socket.to(user.sockerId).emit('recupererMsg', {
                            from: userNameFrom,
                            message: message.body
                        });
        
                        console.log("Message envoyé à:", user.sockerId);
                    } else {
                        console.error('Utilisateur non trouvé:', userName);
                    }
                } else {
                    console.log('Message sans arobase détecté, envoi global');
        
                    io.sockets.sockets.forEach((sock) => {
                        if (sock.data.userId !== userFrom) {
                            console.log(`Envoi d'un message global de ${userNameFrom} à ${sock.id}`);
                            sock.emit('recupererMsg', {
                                from: userNameFrom, 
                                message: msg
                            });
                        }
                    });
                }
        
                socket.emit('recupererMsg', {
                    from: "Vous",
                    message: msg
                });
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error.message);
                socket.emit('errorMessage', error.message);
            }
        });
        
        socket.on('disconnect', async () => {
            console.log(`Utilisateur déconnecté : ${socket.data.userId}`);
        });
    });
}
