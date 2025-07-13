"use client"

import { motion } from "motion/react"

const Button = () => {
  return (
     <div className="h-screen w-full bg-neutral-950 flex items-center justify-center"
    style={{backgroundImage:`radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
      backgroundSize:"8px 8px",
      backgroundRepeat:"repeat"
    }}
    >
      <motion.button
      // initial={{
      //   rotate:0
      // }}
      // animate={{
      //   rotate:[0,10,0]
      // }}
      // transition={{
      //   duration:0.5,
      //   ease:"easeInOut"
      // }}

      whileHover={{
        rotate:10
      }}

      className="group relative text-neutral-500 px-12 py-6 rounded-lg bg-black">Subscribe
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[4px] w-3/4 mx-auto blur-sm "></span>
      </motion.button>
    </div>
  )
}

export default Button