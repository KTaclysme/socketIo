import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import setupSocketIO from './socket/socket.manager';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
	res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

setupSocketIO(io)

server.listen(3001, () => {
	console.log("Serveur et bien lancer sur le port 3001")
}) 