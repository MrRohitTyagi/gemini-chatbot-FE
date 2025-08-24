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
  return `chat w-fit max-w-[80%]  p-2 text-white
      bg-chat-bg border-2 border-chat-border
      rounded-${role}-border overflow-wrap break-words  text-[12px]
      `;
}

const ChatsComp = ({ chats = [], isLoading, onTyping }) => {
  return (
    <div className="flex flex-col gap-2">
      {chats.map((chat, i) => {
        const isUserChat = chat.role === "user";
        return (
          <div
            key={i}
            className={`items-end w-full gap-2 flex flex-row justify-${
              isUserChat ? "end" : "start"
            }`}
          >
            {!isUserChat && (
              <Image
                alt="ME"
                className="h-6 w-6 border-2 border-chat-border rounded-full"
                src={mypic}
              />
            )}
            <motion.div
              className={
                getchatCss(chat.role) + "drop-shadow-lg shadow-violet-700"
              }
            >
              {/* {chat.parts} */}
              {isUserChat ? (
                <span
                  style={commonChatCss}
                  dangerouslySetInnerHTML={{
                    __html: chat.parts,
                  }}
                />
              ) : chat.isStored ? (
                <span
                  style={commonChatCss}
                  dangerouslySetInnerHTML={{
                    __html: chat.parts,
                  }}
                />
              ) : (
                <TypingComponent text={chat.parts} onTyping={onTyping} />
              )}
            </motion.div>
            {isUserChat && (
              <Image
                alt="User"
                className="h-6 w-6 border-2 border-chat-border rounded-full"
                src={userpic}
              />
            )}
          </div>
        );
      })}
      {isLoading && (
        <motion.div
          className="gap-2 flex flex-row items-end "
          initial={{ scale: 0, x: -100 }}
          animate={{ scale: 1, x: 0 }}
        >
          <Image
            alt="ME"
            className="h-6 w-6 border-2 border-chat-border rounded-full"
            src={mypic}
          />
          <motion.div className={getchatCss("model") + "flex flex-row gap-1"}>
            Please Wait <Spinner style={{ height: "20px", width: "15px" }} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatsComp;
