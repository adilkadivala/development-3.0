import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <span className="h-8 w-8 text-neutral-200">H</span>,
    title: "Generate new image",
    description: "hey this is just for learning purpose",
    content: (
      <div>
        <Image
          src={"./globe.svg"}
          alt="img"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <span className="h-8 w-8 text-neutral-200">H</span>,
    title: "Generate eye-catchy image",
    description: "hey this is just for learning purpose",
    content: (
      <div>
        <Image
          src={"./file.svg"}
          alt="img"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <span className="h-8 w-8 text-neutral-200">H</span>,
    title: "Generate eye-catchy layout",
    description: "hey this is just for learning purpose",
    content: (
      <div>
        <Image
          src={"./window.svg"}
          alt="img"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
    ),
  },
];

const Scroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgrounds = ["#343434", "#00193b", "#05291c"];
  const [background, setBackground] = useState(backgrounds[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setBackground(backgrounds[Math.floor(latest * backgrounds.length)]);
  });

  return (
    <motion.div
      animate={{
        background,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      ref={containerRef}
      className="flex min-h-screen  justify-center items-center py-40 bg-neutral-900"
    >
      <div className="mx-auto max-w-4xl flex flex-col gap-10">
        {features.map((feature, idx) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </div>
    </motion.div>
  );
};

export default Scroll;

function Card({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -300]),
    { stiffness: 100, damping: 30, mass: 1 }
  );
  const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

  return (
    <div
      ref={ref}
      key={feature.title}
      className="grid grid-cols-2 items-center gap-20 py-40"
    >
      <motion.div
        style={{
          filter: useMotionTemplate`blur(${blur}px)`,
          scale,
        }}
        className="flex flex-col gap-5"
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
        <p className="text-lg text-neutral-400">{feature.description}</p>
      </motion.div>
      <motion.div style={{ y: translateContent, opacity: opacityContent }}>
        {feature.content}
      </motion.div>
    </div>
  );
}
