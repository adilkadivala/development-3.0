import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  // client is talking with the server
  socket.on("message", (e) => {
    if (e.toLocaleString() === "ping") {
      socket.send("pong");
    }
  });
});
