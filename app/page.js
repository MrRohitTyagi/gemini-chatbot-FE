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

// Suggestions now integrated inline

// const baseurl = "https://gemini-chat-bot-two.vercel.app";
const defaultmessage = [
  {
    role: "model",
    parts: "Hi i am rohit , what do you want to know ?",
  },
];

const suggestions = [
  "Hi!, How are you?",
  "What is your current company?",
  "What are your skills?",
  "What is your notice period?",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
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
      setChats(defaultmessage);
      return;
    }

    setChats(prevChats.map((c) => ({ ...c, isStored: true })));

    setIsLoading(false);
  }, []);

  const handleSendMessage = async (message) => {
    console.log("message", message);
    try {
      const question = message;
      if (!question) return;

      setChats((p) => [...p, { role: "user", parts: question }]);

      setIsLoading(true);

      // let res = await mok(input);
      setTimeout(() => {
        scrollToBottom();
      }, 10);

      let res = await fetchGeminiResponse(question, chats);
      console.log(`%c data `, "color: yellow;border:1px solid lightgreen", res);

      const isErrorMessage = (res || "").includes("Error");

      let updatedchats;
      const obj = { role: "model", parts: res };
      setChats((p) => {
        updatedchats = [...p, obj];
        return [...p, obj];
      });

      setinput("");

      setIsLoading(false);
      setTimeout(() => {
        if (!isErrorMessage)
          localStorage.setItem("chats", JSON.stringify(updatedchats));
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setTimeout(() => {
        setChats((p) => {
          return p.slice(0, -1);
        });
        setIsLoading(false);
        alert(error.message || "Something went wrong");
      }, 500);
    }
  };

  function handleClear() {
    localStorage.removeItem("chats");
    setChats(defaultmessage);
  }

  console.log(`%c {isLoading} `, "color: yellow;border:1px solid lightgreen", {
    isLoading,
    chats,
  });

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main Chat Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-screen bg-slate-900/80 backdrop-blur-xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-800/50 to-slate-800/30"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/mypic.png"
                alt="Rohit"
                className="w-10 h-10 rounded-full border-2 border-blue-400/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1">
                <BotOnline />
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">Rohit Tyagi</h3>
              <p className="text-slate-400 text-xs">AI Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/30 transition-all duration-200"
            >
              <Trash size="16px" className="text-slate-300" />
            </motion.button>
            <InfoIcon />
          </div>
        </motion.div>

        {/* Messages Container */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={ref}
            className="absolute inset-0 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600"
          >
            {chats.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center px-4"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <img src="/mypic.png" alt="Rohit" className="w-14 h-14 rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Hi! I'm Rohit's AI</h3>
                <p className="text-slate-400 text-sm mb-6">Ask me anything about my experience, skills, or projects!</p>
              </motion.div>
            )}

            <ChatsComp chats={chats} isLoading={isLoading} onTyping={onTyping} />
          </div>

          {/* Floating Suggestions */}
          {chats.length <= 1 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 z-10"
            >
              <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
                <p className="text-slate-300 text-sm mb-3 text-center">✨ Quick questions to get started</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        borderColor: "rgba(59, 130, 246, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-3 py-2 bg-slate-700/50 hover:bg-blue-500/20 border border-slate-600/40 hover:border-blue-400/50 rounded-full text-xs text-slate-300 hover:text-blue-300 transition-all duration-200 backdrop-blur-sm"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>

                {/* Floating suggestion indicators */}
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-blue-400/50 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0 p-4 border-t border-slate-700/30 bg-slate-800/30"
        >
          <div className="flex items-end space-x-3">
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
                placeholder="Ask me anything..."
                className="w-full py-3 px-4 bg-slate-700/50 border border-slate-600/40 rounded-2xl text-white placeholder:text-slate-400 focus:bg-slate-700/70 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(input);
                  }
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !input.trim()}
              onClick={() => handleSendMessage(input)}
              className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200 disabled:scale-100"
            >
              <SendHorizonal size="18px" className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
