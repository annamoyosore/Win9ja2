import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { startSocket } from "./twelveSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", () => {
  console.log("Client connected");
});

startSocket(io);

server.listen(5000, () => {
  console.log("Server running on 5000");
});