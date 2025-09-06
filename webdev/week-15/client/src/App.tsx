import { GenericCard } from "./components/card";

function App() {
  return (
    <div>
      <GenericCard
        type="twitter"
        description="this is my fisrt tweet"
        link="https://x.com/boltdotnew/status/1928095590610784494"
        title="bolt hackathon"
      />
      <GenericCard
        type="youtube"
        description="this is the fisrt youtube brain"
        link="https://www.youtube.com/watch?v=lJIrF4YjHfQ"
        title="important video"
      />
    </div>
  );
}

export default App;

