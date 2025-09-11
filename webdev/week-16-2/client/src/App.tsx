import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hi ! there", "hello"]);
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8000");

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="h-11/12 p-2">
        {messages?.map((msg) => (
          <div className="text-white p-2 mt-1 rounded-sm border border-slate-400 w-fit">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex justify-around not-last-of-type:h-1/12">
        <input
          id="message"
          type="text"
          placeholder="write a message....."
          className="w-3/5 text-white p-4 border border-slate-500 placeholder:text-slate-400"
        />
        <button
          type="button"
          className="w-1/3 bg-indigo-700 text-white rounded-sm cursor-pointer"
          onClick={() => {
            const message = document.getElementById("message")?.value;
            wsRef?.current?.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: message,
                },
              })
            );
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
