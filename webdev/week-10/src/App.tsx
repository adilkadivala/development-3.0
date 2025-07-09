import { createContext, useContext, useState } from "react";
import { motion } from "motion/react";
import "./App.css";

// context

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState<boolean>(true);

  return (
    <BulbContext.Provider value={{ bulbOn, setBulbOn }}>
      {children}
    </BulbContext.Provider>
  );
}

// main component
function App() {
  return (
    <BulbProvider>
      <LightBulb />
    </BulbProvider>
  );
}

export default App;

// other components

function LightBulb() {
  return (
    <div>
      <BulbState />
      <ToggleBulb />
    </div>
  );
}

function BulbState() {
  const { bulbOn } = useContext(BulbContext);
  return <div>{bulbOn ? "Bulb On" : "Bulb Off"}</div>;
}

function ToggleBulb() {
  const { setBulbOn } = useContext(BulbContext);

  function toggle() {
    setBulbOn((currentState) => !currentState);
  }
  return (
    <motion.button
      initial={{
        rotate: 0,
      }}
      animate={{
        rotate: [0, 20, 0],
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      onClick={toggle}
    >
      ToggleBulb
    </motion.button>
  );
}
