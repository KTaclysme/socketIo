import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AnyError } from 'mongodb';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const users:any = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public" + "/index.html");
});


io.on('connection' , (socket) => {
	console.log('Un utilisateur est connecté');
	
	socket.on("send", (data) => { 
		const {from, msg} = data;
		
		console.log("Message recu de "+from)
		console.log("Message :  "+msg)
		
		if(msg.startsWith('@') ){
			let name = msg.substring(1, msg.indexOf(" "))
			io.to(users[name]).emit("recupererMsg", msg.substring(name.length+2));
		}else{
			console.log("Message envoyer à tout le monde")
			io.emit("recupererMsg", msg);
		}
		
		console.log("\n")
	});
	
	socket.on("register", (username) => { 
		users[username] = socket.id
		console.log('Un utilisateur est connecter sous le nom de '+ username);
	});
	
	socket.on("disconnect" , () =>{
		for(let username in users){
			if(users[username] == socket.id){
				delete users[username];
				break;
			}
		}
		console.log('Un utilisateur est déconnecté');
	});
	
});

server.listen(3001, () => {
	console.log("Serveur et bien lancer sur le port 3001")
}) 
