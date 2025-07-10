import { useEffect, useRef, useState } from "react";
import "./App.css";

// custom hook

function useCounter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    setCount((prev) => prev - 1);
  }

  return {
    count,
    increase,
    decrease,
  };
}

// custom usefetch

function useFetch(url) {
  const [post, setPost] = useState({});

  const getData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setPost(json);
  };

  useEffect(() => {
    getData();
  }, [url]);

  // refetching if backend get update every 10 sec.
  useEffect(() => {
    setInterval(getData(), 10 * 1000);
  }, []);

  return post;
}

// use-prev for getting last value of state
function usePrev(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// debouncing hook
function useDebaunce(originalFn) {
  const currentClock = useRef();

  const fn = () => {
    clearTimeout(currentClock.current);
    currentClock.current = setTimeout(originalFn, 500);
  };

  return fn;
}

function App() {
  function sendQuerytoBackend() {
    fetch("api.amazon.com/search");
  }

  const debounceFn = useDebaunce(sendQuerytoBackend);
  return (
    <>
      <Counter />
      <GetData />
      <input type="text" name="input" id="1" onChange={debounceFn}></input>
    </>
  );
}

export default App;

// counter comp
function Counter() {
  const { count, increase, decrease } = useCounter();
  const prev = usePrev(count);
  return (
    <div>
      <button onClick={increase}>increase</button>
      <p>current : {count}</p>
      <button onClick={decrease}>decrease</button>
      <p>previous :{prev}</p>
    </div>
  );
}

// fetch comp

function GetData() {
  const post = useFetch("https://jsonplaceholder.typicode.com/posts/1");

  return <div>{<p>{post?.title}</p>}</div>;
}
