"use client";
import { motion } from "framer-motion";
import TypingComponent from "./Typewritereffect.jsx";
import mypic from "@/public/mypic.jpg";
import userpic from "@/public/userimg.png";
import Image from "next/image";

function getchatCss(role) {
  return `chat w-fit max-w-[80%]  p-2 text-white
      bg-chat-bg border-2 border-chat-border
      rounded-${role}-border overflow-wrap break-words text-sm
      `;
}

const ChatsComp = ({ chats = [], isLoading }) => {
  return (
    <div className="flex flex-col gap-2">
      {chats.map((chat, i) => {
        const isUserChat = chat.role === "user";
        return (
          <div
            key={i}
            className={`w-full gap-2 flex flex-row justify-${
              isUserChat ? "end" : "start"
            }`}
          >
            {!isUserChat && (
              <Image
                className="h-6 w-6 border-2 border-chat-border rounded-full"
                src={mypic}
              />
            )}
            <motion.div
              initial={{ scale: 0.5, x: -100, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              className={
                getchatCss(chat.role) + "drop-shadow-lg shadow-violet-700"
              }
            >
              {/* {chat.parts} */}
              {isUserChat ? chat.parts : <TypingComponent text={chat.parts} />}
            </motion.div>
            {isUserChat && (
              <Image
                className="h-6 w-6 border-2 border-chat-border rounded-full"
                src={userpic}
              />
            )}
          </div>
        );
      })}
      {isLoading && (
        <motion.div
          initial={{ scale: 0, x: -100 }}
          animate={{ scale: 1, x: 0 }}
          className={getchatCss("model")}
        >
          Loading...
        </motion.div>
      )}
    </div>
  );
};

export default ChatsComp;
