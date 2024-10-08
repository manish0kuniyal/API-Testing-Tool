import React from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sidebar({ isOpen, toggleSidebar }) {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={sidebarVariants}
    transition={{ duration: 1.2 }}
      className={`fixed top-0 left-0 h-full bg-bkShade text-wtShade transition-transform duration-300 z-10 md:relative md:w-[10%] ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <button
        className="fixed top-0 right-0 p-4 bg-bkShade text-wtShade z-20 md:hidden"
        onClick={toggleSidebar}
      >
        X
      </button>

      <ul className="pt-12 md:pt-12 w-full">
        {SidebarData.map((val, key) => (
          <motion.li
            key={key}
            className="p-3"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: key * 0.1 }}
          >
            <Link to={val.link} className=" flex items-center px-4  text-prShade hover:text-wtShade  text-lg  p-2 font-bold  w-[100%] ">
              <div className='mr-2'>{val.icon}</div>
              <div onClick={toggleSidebar}>{val.title}</div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Sidebar;
