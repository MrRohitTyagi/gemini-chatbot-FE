"use client";

import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scroll({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
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
      let res = await fetchGeminiResponse(question);
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
    <main className="min-h-screen min-w-screen bg-main-screen">
      <div className="h-header-box border-b-2 border-chat-border flex justify-between flex-row gap-2 items-center px-4">
        <div>
          <BotOnline />
        </div>
        <motion.h3
          initial={{ opacity: 0, transform: "blur(2px)" }}
          animate={{ opacity: 1, transform: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="text-amber-400 text-sm md:text-md lg:text-xl xl:text-2xl"
        >
          Meet the AI incarnation of myself
        </motion.h3>
        <div className="flex gap-4 flex-row">
          <button onClick={handleClear}>
            <Trash size="24px" color="white" />
          </button>
          <InfoIcon />
        </div>
      </div>
      <div ref={ref} className="h-chat-window w-full p-4 overflow-y-auto">
        <ChatsComp chats={chats} isLoading={isLoading} />
      </div>
      <div className="h-typing-box w-full flex flex-row gap-3 items-center px-2 py-5">
        {!isLoading && (
          <Suggestions
            chats={chats}
            setchats={setchats}
            handleSendMessage={handleSendMessage}
          />
        )}
        <Input
          disabled={isLoading}
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
          placeholder="Send message"
          className="rounded-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(input);
          }}
        />
        <button
          disabled={isLoading}
          onClick={handleSendMessage}
          className="send-logo border-2 p-2 rounded-full flex flex-row justify-center items-center"
        >
          <SendHorizonal size="20px" color="white" />
        </button>
      </div>
    </main>
  );
}
