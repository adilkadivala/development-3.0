import Image from "next/image";
import React, { useState } from "react";

type Card = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

const cards: Card[] = [
  {
    description: "Lana Del Lay",
    title: "summertime vibe",
    src: "./globe.svg",
    ctaText: "Play",
    ctaLink: "https://www.github.com/adilkadivala",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
          facilis autem sint dolor illo sunt ullam? Facilis, quibusdam ratione!
          Facilis alias, numquam molestiae labore maiores libero optio. Tenetur
          cupiditate, voluptatibus facere, quo assumenda aperiam ad a voluptatem
          sunt minus quos hic architecto voluptate commodi omnis aspernatur
          laudantium doloribus. Eaque, odit.
        </p>
      );
    },
  },
  {
    description: "Babu Lal",
    title: "full-seazon vibe",
    src: "./globe.svg",
    ctaText: "Play",
    ctaLink: "https://www.github.com/adilkadivala",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
          facilis autem sint dolor illo sunt ullam? Facilis, quibusdam ratione!
          Facilis alias, numquam molestiae labore maiores libero optio. Tenetur
          cupiditate, voluptatibus facere, quo assumenda aperiam ad a voluptatem
          sunt minus quos hic architecto voluptate commodi omnis aspernatur
          laudantium doloribus. Eaque, odit.
        </p>
      );
    },
  },
  {
    description: "Chotu Dada",
    title: "overacting ",
    src: "./globe.svg",
    ctaText: "Play",
    ctaLink: "https://www.github.com/adilkadivala",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
          facilis autem sint dolor illo sunt ullam? Facilis, quibusdam ratione!
          Facilis alias, numquam molestiae labore maiores libero optio. Tenetur
          cupiditate, voluptatibus facere, quo assumenda aperiam ad a voluptatem
          sunt minus quos hic architecto voluptate commodi omnis aspernatur
          laudantium doloribus. Eaque, odit.
        </p>
      );
    },
  },
  {
    description: "sunny HOT",
    title: "night vibe",
    src: "./globe.svg",
    ctaText: "Play",
    ctaLink: "https://www.github.com/adilkadivala",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
          facilis autem sint dolor illo sunt ullam? Facilis, quibusdam ratione!
          Facilis alias, numquam molestiae labore maiores libero optio. Tenetur
          cupiditate, voluptatibus facere, quo assumenda aperiam ad a voluptatem
          sunt minus quos hic architecto voluptate commodi omnis aspernatur
          laudantium doloribus. Eaque, odit.
        </p>
      );
    },
  },
];

const LayoutCard = () => {
  const [current, setCurrent] = useState<Card | null>(null);

  return (
    <div className="py-10 bg-gray-100 min-h-screen relative">
      {current && (
        <div className="h-[600px] w-80 rounded-2xl border border-neutral-200 p-4"></div>
      )}
      <div className="max-w-lg mx-auto flex flex-col gap-10">
        {cards.map((card) => (
          <button
            onClick={() => setCurrent(card)}
            key={card.title}
            className="p-4 cursor-pointer rounded-lg flex justify-between items-center bg-white border border-neutral-200"
          >
            <div className="flex gap-4 items-center">
              <Image
                src={card.src}
                alt={card.title}
                height={50}
                width={50}
                className="aspect-square rounded-2xl"
              />
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-bold text-xs tracking-tight text-black">
                  {card.title}
                </h2>
                <p className="text-[10px] text-neutral-500">
                  {card.description}
                </p>
              </div>
            </div>
            <div className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">
              play
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutCard;
