"use client";

import Animated from "./animated-text/page";
import AnimationSequence from "./animation-sequences/page";
import Card from "./card/page";
import Scroll from "./scroll/page";
import Sidebar from "./sidebar/page";

export default function Home() {
  return (
    <div>
      <Scroll />
    </div>
    // <div className="h-screen flex items-center justify-center bg-gray-50">
    //   <Sidebar />
    // </div>
  );
}
