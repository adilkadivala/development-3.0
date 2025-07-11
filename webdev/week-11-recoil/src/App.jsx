import "./App.css";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";

function App() {
  return (
    <RecoilRoot>
      <Increase />
      <CurrentCount />
      <Decrease />
    </RecoilRoot>
  );
}

export default App;

function CurrentCount() {
  const count = useRecoilValue(counterAtom);

  return <p>{count}</p>;
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  function decrese() {
    setCount((current) => current - 1);
  }

  return <button onClick={decrese}>decrese</button>;
}
function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  function increse() {
    setCount((current) => current + 1);
  }

  return <button onClick={increse}>increse</button>;
}
