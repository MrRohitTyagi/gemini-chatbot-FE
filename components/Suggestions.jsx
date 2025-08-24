"use client";

import React from "react";
import { getchatCss } from "./ChatComp";
import { motion } from "framer-motion";

const suggestions = [
  "Hi!, How are you?",
  "What is your current company?",
  "What are your skills?",
  "What is your notice period?",
];

const Suggestions = ({ setchats, chats, handleSendMessage }) => {
  if (chats.length > 2) return null;

  return (
    <div
      className={`text-white absolute gap-4 
    flex flex-row flex-wrap bottom-[5rem]
       p-6 items-center justify-center z-10`}
    >
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
