import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  // client is talking with the server
  socket.on("message", (e) => {
    if (e.toLocaleString() === "ping") {
      socket.send("pong");
    }
  });

  socket.on("message", (message) => {
    console.log("message recevied !" + message.toString());
    socket.send(message.toString() + "sent from the server");
  });
});
