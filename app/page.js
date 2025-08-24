"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SendHorizonal, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import ChatsComp from "@/components/ChatComp";

import InfoIcon from "@/components/InfoIcon";
import { fetchGeminiResponse } from "@/controllers/geminiResponse";
import BotOnline from "@/components/BotOnline";
import { getStoredChats } from "@/utils/helperFunctions";

const Suggestions = dynamic(() => import("@/components/Suggestions"), {
  ssr: false,
});

// const baseurl = "https://gemini-chat-bot-two.vercel.app";
const defaultmessage = [
  {
    role: "model",
    parts: "Hi i am rohit , what do you want to know ?",
  },
];

export default function Home() {
  const [isLoading, setisLoading] = useState(false);
  const [chats, setchats] = useState([]);
  const [input, setinput] = useState("");

  const ref = useRef();

  const scrollToBottom = useCallback(() => {
    ref.current.scroll({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [ref]);

  const onTyping = useCallback(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    let id;
    if (ref.current) {
      id = setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
    return () => {
      clearInterval(id);
    };
  }, [chats, isLoading]);

  useEffect(() => {
    const prevChats = getStoredChats();

    if (!prevChats) {
      setchats(defaultmessage);
      return;
    }

    setchats(prevChats.map((c) => ({ ...c, isStored: true })));

    setisLoading(false);
  }, []);

  const handleSendMessage = async (message) => {
    console.log("message", message);
    try {
      const question = message;
      if (!question) return;

      setchats((p) => [...p, { role: "user", parts: question }]);

      setTimeout(() => {
        setisLoading(true);
      }, 200);
      // let res = await mok(input);
      setTimeout(() => {
        scrollToBottom();
      }, 200);

      let res = await fetchGeminiResponse(question, chats);
      console.log(`%c data `, "color: yellow;border:1px solid lightgreen", res);

      const isErrorMessage = (res || "").includes("Error");

      let updatedchats;
      const obj = { role: "model", parts: res };
      setchats((p) => {
        updatedchats = [...p, obj];
        return [...p, obj];
      });

      setinput("");

      setisLoading(false);
      setTimeout(() => {
        if (!isErrorMessage)
          localStorage.setItem("chats", JSON.stringify(updatedchats));
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setisLoading(false);
    }
  };

  function handleClear() {
    localStorage.removeItem("chats");
    setchats(defaultmessage);
  }

  return (
    <main
      className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative"
      style={{
        display: "grid",
        gridTemplateRows: "4rem calc(100vh - (4rem + 5rem)) 5rem",
      }}
    >
      {/* Suggestions Component */}
      {!isLoading && (
        <Suggestions
          chats={chats}
          setchats={setchats}
          handleSendMessage={handleSendMessage}
        />
      )}

      {/* Background pattern */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg"
      >
        <div className="h-16 flex justify-between items-center px-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 pl-4">
            <BotOnline />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-md md:text-xl lg:text-2xl font-bold text-center flex-1"
          >
            Meet the AI incarnation of myself
          </motion.h1>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            >
              <Trash size="18px" className="text-white/80" />
            </motion.button>
            <InfoIcon />
          </div>
        </div>
      </motion.div>

      {/* Chat Window */}
      <div
        ref={ref}
        className="chat-container relative w-full mx-auto p-4 overflow-y-auto custom-scrollbar"
      >
        <ChatsComp chats={chats} isLoading={isLoading} onTyping={onTyping} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="backdrop-blur-md bg-white/5 border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                disabled={isLoading}
                ref={(el) => {
                  if (el) {
                    el.focus();
                  }
                }}
                value={input}
                onChange={(e) => setinput(e.target.value)}
                placeholder="Type your message..."
                className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-purple-400/50 transition-all duration-200"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(input);
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              onClick={() => handleSendMessage(input)}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
            >
              <SendHorizonal size="20px" className="text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
