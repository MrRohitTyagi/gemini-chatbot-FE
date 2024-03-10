"use client";

import React, { useEffect, useState } from "react";
import { getchatCss } from "./ChatComp";
import { motion } from "framer-motion";

const suggestions = [
  "Hi!, How are you ?",
  "What are your Hobbies ?",
  "What are your skills ?",
  "What is your notice period ?",
];

const Suggestions = ({ setchats, chats, handleSendMessage }) => {
    if (chats.length > 3) return null;
  const isMobile = window.innerWidth < 768;

  const [topPosition, setTopPosition] = useState("50%");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust threshold as needed
      setTopPosition(isMobile ? "50%" : "75%");
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial state
    handleResize();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`text-white absolute gap-4 
    flex flex-row flex-wrap w-[95vw] left-1
       p-6 items-center justify-center
     top-[${topPosition}]       
  `}
    >
      {/* <div className="top-[50%] top-[75%]"></div> */}
      {suggestions.map((sug, index) => (
        <motion.button
          initial={{ scale: 0, y: -100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.2, type: "spring" }}
          onClick={() => {
            handleSendMessage(sug);
          }}
          key={index}
          className={
            getchatCss("suggestion") +
            `opacity-50 drop-shadow-lg shadow-violet-700 text-nowrap w-full md:w-auto cursor-pointer
            transition-all duration-300 ease-in-out
             hover:opacity-100`
          }
        >
          {sug}
        </motion.button>
      ))}
    </div>
  );
};

export default Suggestions;
