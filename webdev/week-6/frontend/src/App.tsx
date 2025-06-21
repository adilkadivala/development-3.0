import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Paths from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-center">Vite + React</h1>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="border border-indigo-500 rounded"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <BrowserRouter>
        <Paths />
      </BrowserRouter>
    </>
  );
}

export default App;
