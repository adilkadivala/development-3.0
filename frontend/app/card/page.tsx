import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const Card = () => {
  const [open, setOpen] = useState<Boolean>(true);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity:1,
              scale:1,
              filter:"blur(1px)"
            }}
            animate={{
              opacity:1,
              scale:1,
              filter:"blur(0px)"
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={cn(
              "w-72 min-h-[26rem] h-[28rem] rounded-xl text-neutral-800 bg-white",
              "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
              "p-6 flex flex-col"
            )}
          >
            <h2 className="font-bold text-[10px]">kadi - A real DeV</h2>
            <p className="text-neutral-600 mt-2 text-[10px]">
              I learn this from Pagi, heh he's a really F*ck guy
            </p>
            <div className="flex item-center justify-center">
              <button
                className="flex items-center gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image width={20} height={20} alt="logo" src={"./globe.svg"} />{" "}
                globe
                <span className="h-3 w-3 text-neutral-400">X</span>
              </button>
            </div>
            <div className="flex-1 bg-gray-100 mt-4 rounded-lg border border-dashed border-neutral-200 relative">
              {/* motion divs start*/}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  filter: "blur(0px)",
                }}
                // transition={{
                //   duration: 0.3,
                //   ease: "easeInOut",
                // }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="absolute inset-0 h-full w-full bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200"
              >
                {/* rows start*/}
                <div className="flex gap-2 p-4">
                  <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                    <Image width={9} height={9} alt="icon" src={"./file.svg"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] font-bold text-neutral-600">
                      This is first row
                    </p>
                    <p className="text-neutral-400 text-[8px] mt-1">
                      A collection of Design
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                    <Image width={9} height={9} alt="icon" src={"./file.svg"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] font-bold text-neutral-600">
                      This is first row
                    </p>
                    <p className="text-neutral-400 text-[8px] mt-1">
                      A collection of Design
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                    <Image width={9} height={9} alt="icon" src={"./file.svg"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] font-bold text-neutral-600">
                      This is first row
                    </p>
                    <p className="text-neutral-400 text-[8px] mt-1">
                      A collection of Design
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                    <Image width={9} height={9} alt="icon" src={"./file.svg"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] font-bold text-neutral-600">
                      This is first row
                    </p>
                    <p className="text-neutral-400 text-[8px] mt-1">
                      A collection of Design
                    </p>
                  </div>
                </div>
                {/* rows end*/}

                <div className="flex gap-2 p-4 items-center justify-center">
                  <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                    <Image width={9} height={9} alt="icon" src={"./file.svg"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-neutral-600 text-[8px] mt-1">
                      A collection of Design
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* motion divs end*/}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;
