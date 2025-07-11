import "./App.css";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";
import { evenNo, oddNo } from "./store/selectors/counter";

function App() {
  return (
    <RecoilRoot>
      <Increase />
      <IncreaseByTwo />
      <CurrentCount />
      <Decrease />
      <DecreaseByTwo />
      <IsEven />
      <IsOdd />
    </RecoilRoot>
  );
}

export default App;

// current count
function CurrentCount() {
  const count = useRecoilValue(counterAtom);

  return <p>{count}</p>;
}

// decrese
function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  function decrese() {
    setCount((current) => current - 1);
  }

  return <button onClick={decrese}>decrese - 1</button>;
}

// increase
function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  function increse() {
    setCount((current) => current + 1);
  }

  return <button onClick={increse}>increse +1 </button>;
}

// decrese
function DecreaseByTwo() {
  const setCount = useSetRecoilState(counterAtom);

  function decrese() {
    setCount((current) => current - 2);
  }

  return <button onClick={decrese}>decrese - 2</button>;
}

// increase
function IncreaseByTwo() {
  const setCount = useSetRecoilState(counterAtom);

  function increse() {
    setCount((current) => current + 2);
  }

  return <button onClick={increse}>increse + 2</button>;
}

// is even
function IsEven() {
  const even = useRecoilValue(evenNo);

  return <p>is number even ? {even ? "true" : "false"}</p>;
}

// is odd
function IsOdd() {
  const odd = useRecoilValue(oddNo);
  return <p>is number odd ? {odd ? "true" : "false"}</p>;
}
