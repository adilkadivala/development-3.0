"use client";

import { useAnimate, motion, stagger } from "motion/react";
import React, { useEffect } from "react";

const Animated = () => {
  const [scope, animate] = useAnimate();

  const text =
    "Welcome, Hey I'm Kadi, I've build this for learning a framer, it's now a fancy tool to show your durty hands on skill";

  function startAnimate() {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        duration: 0.5,
        ease: "easeInOut",
        delay: stagger(0.02),
      }
    );
  }

  useEffect(() => {
    startAnimate();
  }, []);

  return (
    <div
      className="text-white max-w-4xl mx-auto font-bold text-4xl"
      ref={scope}
    >
      {/* <motion.span className="opacity-0 inline-block">{text}</motion.span> */}
      {/* <button
        onClick={startAnimate}
        className="bg-neutral-800 px-4 py-2 rounded-md cursor-pointer active:scale-110 transition duration-150"
      >
        Click Me
      </button> */}

      <br />

      {text.split(" ").map((word, index) => (
        <motion.span
          style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          key={word + index}
          className="inline-block"
        >
          {word} &nbsp;
        </motion.span>
      ))}
    </div>
  );
};

export default Animated;
