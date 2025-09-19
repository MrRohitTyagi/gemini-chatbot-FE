"use client";
import { motion } from "framer-motion";
import TypingComponent from "./Typewritereffect.jsx";
import mypic from "@/public/mypic.png";
import userpic from "@/public/userimg.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "./Spinner/Spinner.jsx";
import { commonChatCss } from "@/constants.js";

export function getchatCss(role) {
  // This function is now deprecated, using inline styles in the component
  return "";
}

const ChatsComp = ({ chats = [], isLoading, onTyping }) => {
  return (
    <div className="space-y-6">
      {chats.map((chat, i) => {
        const isUserChat = chat.role === "user";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`flex items-start gap-3 ${isUserChat ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Image
                alt={isUserChat ? "User" : "Rohit"}
                className="w-10 h-10 rounded-full border-2 border-slate-600/30 shadow-lg"
                src={isUserChat ? userpic : mypic}
              />
            </motion.div>

            {/* Message Container */}
            <div className={`flex flex-col ${isUserChat ? "items-end" : "items-start"} max-w-[75%]`}>
              {/* Name and Time */}
              <div className={`flex items-center gap-2 mb-1 ${isUserChat ? "flex-row-reverse" : ""}`}>
                <span className="text-xs font-medium text-slate-400">
                  {isUserChat ? "You" : "Rohit"}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Message Bubble */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                  isUserChat
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                    : "bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-bl-md"
                }`}
              >
                {/* Message Content */}
                {isUserChat ? (
                  <div
                    style={commonChatCss}
                    dangerouslySetInnerHTML={{ __html: chat.parts }}
                    className="text-sm leading-relaxed"
                  />
                ) : chat.isStored ? (
                  <div
                    style={commonChatCss}
                    dangerouslySetInnerHTML={{ __html: chat.parts }}
                    className="text-sm leading-relaxed"
                  />
                ) : (
                  <div className="text-sm leading-relaxed">
                    <TypingComponent text={chat.parts} onTyping={onTyping} />
                  </div>
                )}

                {/* Message Tail */}
                <div
                  className={`absolute w-3 h-3 ${
                    isUserChat
                      ? "-right-1 bottom-0 bg-blue-600 rotate-45 rounded-br-sm"
                      : "-left-1 bottom-0 bg-slate-800 rotate-45 rounded-bl-sm border-l border-b border-slate-700/50"
                  }`}
                />
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      {/* Typing Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image
              alt="Rohit"
              className="w-10 h-10 rounded-full border-2 border-slate-600/30 shadow-lg"
              src={mypic}
            />
          </motion.div>

          <div className="flex flex-col items-start max-w-[75%]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-slate-400">Rohit</span>
              <span className="text-xs text-slate-500">thinking...</span>
            </div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative px-4 py-3 rounded-2xl rounded-bl-md bg-slate-800/80 border border-slate-700/50 shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>

              <div className="absolute -left-1 bottom-0 w-3 h-3 bg-slate-800 rotate-45 rounded-bl-sm border-l border-b border-slate-700/50" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatsComp;
