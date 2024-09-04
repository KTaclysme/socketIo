import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import setupSocketIO from './socket/socket.manager';
import router from './routes/index'

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.use('/', router)

setupSocketIO(io)

server.listen(3001, () => {
	console.log("Serveur et bien lancer sur le port 3001")
}) 