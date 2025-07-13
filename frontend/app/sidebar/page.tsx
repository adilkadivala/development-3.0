import { useState } from "react";
import { delay, motion, stagger } from "motion/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: "home", href: "/", icon: "H" },
    { name: "products", href: "/products", icon: "P" },
    { name: "users", href: "/users", icon: "U" },

    { name: "setting", href: "/setting", icon: "S" },
  ];

  //   motion varient

  const sidebarVarient = {
    open: {
      width: "16rem",
    },
    close: {
      width: "4.5rem",
    },
  };

  const childVarient = {
    open: {
      opacity: 1,
      y: 0,
    },
    close: {
      opacity: 0,
      y: -10,
    },
  };
  const parentVarient = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    close: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: -1,
      },
    },
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "close"}
      exit={"close"}
      transition={{
        duration: 0.3,
      }}
      className="border-r text-neutral-700 border-neutral-100 h-full"
    >
      <motion.nav
        variants={sidebarVarient}
        // transition={{
        //   duration: 0.3,
        // }}
        className="bg-white shadow-md h-full"
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-xl font-semibold ${!isOpen && "sr-only"}`}>
            Dashboard
          </h2>
          <button
            onClick={toggleSideBar}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none "
            aria-label={isOpen ? "close sidebar" : "Open sidebar"}
          >
            {isOpen ? "close" : "opne"}
          </button>
        </div>

        {/* sidebar content */}
        <div className="relative">
          <nav className="p-4">
            <motion.ul variants={parentVarient} className="space-y-2">
              {links.map((link) => (
                <motion.li variants={childVarient} key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200"
                    title={!isOpen ? link.name : " "}
                  >
                    {link.icon}
                    {isOpen && link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Sidebar;
