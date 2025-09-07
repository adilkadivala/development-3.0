import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage() {
    if (!socket) {
      return;
    }

    const message = inputRef.current.value;
    socket.send(message);
  }

  // connecting with websocket server
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="message..." ref={inputRef}></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
