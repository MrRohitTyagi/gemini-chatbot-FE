"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Info, SendHorizonal, Trash } from "lucide-react";
import ChatsComp from "@/components/ChatComp";

import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

// const baseurl = "https://gemini-chat-bot-two.vercel.app";
const baseurl = process.env.NEXT_PUBLIC_BE_BASE_URL;

async function fetchGeminiResponse(input) {
  try {
    const { data } = await axios.post(`${baseurl}/api/v1/getresponse`, {
      prompt: input,
    });
    // let data = await mok(input);
    return data;
  } catch (error) {
    console.log("error", error);
    return;
  }
}
export default function Home() {
  const [isLoading, setisLoading] = useState(true);
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
    setisLoading(true);
    const prevChats = localStorage.getItem("chats");

    setTimeout(() => {
      if (prevChats) {
        setchats(JSON.parse(prevChats));
      } else {
        setchats([
          {
            role: "model",
            parts: "Hi i am rohit , what do you want to know ?",
          },
        ]);
      }
      setisLoading(false);
    }, 500);
  }, []);

  const handleSendMessage = async (message) => {
    try {
      if (!input) return;
      setchats((p) => [...p, { role: "user", parts: input }]);

      setTimeout(() => {
        setisLoading(true);
      }, 200);
      // let res = await mok(input);
      let res = await fetchGeminiResponse(input);
      let updatedchats;
      setchats((p) => {
        updatedchats = [
          ...p,
          {
            role: "model",
            parts: res || "Something went wrong please try again",
          },
        ];
        return [
          ...p,
          {
            role: "model",
            parts: res || "Something went wrong please try again",
          },
        ];
      });
      setinput("");
      setisLoading(false);
      setTimeout(() => {
        localStorage.setItem("chats", JSON.stringify(updatedchats));
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setisLoading(false);
    }
  };
  function handleClear() {
    localStorage.removeItem("chats");
    setchats([
      {
        role: "model",
        parts: "Hi i am rohit , what do you want to know ?",
      },
    ]);
  }

  return (
    <main className="min-h-screen min-w-screen bg-main-screen">
      <div className="h-header-box border-b-2 border-chat-border flex justify-between flex-row gap-2 items-center px-4">
        <div></div>
        <motion.h3
          initial={{ opacity: 0, transform: "blur(2px)" }}
          animate={{ opacity: 1, transform: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="text-amber-400 "
        >
          Meet the AI incarnation of myself
        </motion.h3>
        <div className="flex gap-4 flex-row">
          <button onClick={handleClear}>
            <Trash size="24px" color="white" />
          </button>
          <Popover className="w-full">
            <PopoverTrigger>
              <Info size="24px" color="white" />
            </PopoverTrigger>
            <PopoverContent className="bg-main-screen text-white">
              <ol className="space-y-2">
                <li className="text-[14px]">
                  1: Knowledgeable : Equipped with information about my
                  preferences and expertise.
                </li>
                <li className="text-[14px]">
                  2: Contextual Understanding : Capable of interpreting
                  questions and providing relevant answers.
                </li>
                <li className="text-[14px]">
                  3: Reliable : Consistently delivers accurate and coherent
                  responses.(sometimes not)
                </li>
                <li className="text-[14px]">
                  4: Time-saving : Handles inquiries efficiently, freeing up
                  your time for other tasks.
                </li>

                <li className="text-[14px]">
                  5: Continuously Learning : Adapts and improves over time to
                  better represent you.
                </li>
              </ol>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div ref={ref} className="h-chat-window w-full p-4 overflow-y-auto">
        <ChatsComp chats={chats} isLoading={isLoading} />
      </div>
      <div className="h-typing-box w-full flex flex-row gap-3 items-center px-2 py-5">
        <Input
          disabled={isLoading}
          value={input}
          onChange={(e) => setinput(e.target.value)}
          placeholder="Send message"
          className="rounded-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
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
