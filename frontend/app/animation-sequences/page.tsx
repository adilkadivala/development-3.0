"use client";

import { motion, useAnimate } from "motion/react";
import React from "react";

const AnimationSequence = () => {
  const [scope, animate] = useAnimate();

  async function startAnimating() {
    animate(".text", { display: "none" }, { duration: 0.1 });
    await animate(
      "button",
      { width: "5rem", borderRadius: "1000px" },
      { duration: 0.3 }
    );
    animate(
      ".spinning-circle",
      {
        opacity: 1,
        scale: [0, 1.2, 0.8, 1],
      },
      { duration: 0.5 }
    );
  }
  return (
    <div
      ref={scope}
      className="relative w-60 h-20 flex items-center justify-center"
    >
      <motion.button
        onClick={startAnimating}
        style={{ width: "20rem" }}
        className="h-20 rounded-lg bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 text-white font-medium cursor-pointer"
      >
        <span className="text">Purchase Now ($570)</span>
      </motion.button>
      <motion.div
        style={{ opacity: 0, scale: 0 }}
        className="spinning-circle h-20 w-20 rounded-full bg-green-500 absolute inset-0 m-auto"
      ></motion.div>
    </div>
  );
};

export default AnimationSequence;
