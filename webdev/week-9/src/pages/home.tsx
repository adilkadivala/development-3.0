import { useRef, useState } from "react";

const Home = () => {
  const [currentCount, setCurrentCount] = useState(0);
  const timer = useRef(0);

  function startClock() {
    let value = setInterval(() => {
      setCurrentCount((prev) => prev + 1);
    }, 1000);

    timer.current = value;
  }

  function stopClock() {
    clearInterval(timer.current);
  }

  return (
    <div>
      <button onClick={startClock}>start</button>
      <p>{currentCount}</p>
      <button onClick={stopClock}>stop</button>
    </div>
  );
};

export default Home;
