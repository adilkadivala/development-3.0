import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 5000 }); 


server.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("message", (data) => {
        console.log("Received message:", data.toString());
    });

    socket.send("Welcome to the WebSocket server!");
    socket.send("This is a message from the server.");

    socket.on("close", () => {
        console.log("Client disconnected");
    });

});