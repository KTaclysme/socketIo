import { Server, Socket } from 'socket.io';

const users: { [username: string]: string } = {};

export default function setupSocketIO(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('register', (username: string) => {
      users[username] = socket.id;
      console.log('Un utilisateur est connecté sous le nom de ' + username);
    });

    socket.on('send', (data: { from: string; msg: string }) => {
      const { from, msg } = data;

      console.log('Message reçu de ' + from);
      console.log('Message : ' + msg);

      if (msg.startsWith('@')) {
        const name = msg.substring(1, msg.indexOf(' '));
        const message = msg.substring(name.length + 2);
        const recipientSocketId = users[name];

        if (recipientSocketId) {
          io.to(recipientSocketId).emit('recupererMsg', message);
        } else {
          console.log('Utilisateur ' + name + ' non trouvé');
        }
      } else {
        console.log('Message envoyé à tout le monde');
        io.emit('recupererMsg', msg);
      }

      console.log('\n');
    });

    socket.on('disconnect', () => {
      for (const username in users) {
        if (users[username] === socket.id) {
          delete users[username];
          break;
        }
      }
      console.log('Un utilisateur est déconnecté');
    });
  });
}
