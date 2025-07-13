"use client";

import Animated from "./animated-text/page";
import AnimationSequence from "./animation-sequences/page";
import Card from "./card/page";

export default function Home() {
  return (
    // <div className="h-screen w-full bg-neutral-950 flex items-center justify-center">
    //   <AnimationSequence />
    // </div>
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Card />
    </div>
  );
}
