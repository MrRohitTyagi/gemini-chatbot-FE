"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Info, SendHorizonal } from "lucide-react";
import ChatsComp from "@/components/ChatComp";
import { mok } from "@/utils/helperFunctions";
import mypic from "@/public/mypic.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const baseurl = "https://gemini-chat-bot-two.vercel.app";
const baseurl = "http://localhost:5000";

async function fetchGeminiResponse(input) {
  try {
    // const { data } = await axios.post(`${baseurl}/api/v1/getresponse`, {
    //   prompt: input,
    // });
    let data = await mok(input);
    console.log(`%c data `, "color: yellow;border:1px solid lightgreen", data);
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
  console.log(
    `%c {isLoading,chats} `,
    "color: white;border:3px solid white;margin:5px",
    { isLoading, chats, input }
  );
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
  }, [chats]);

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
      console.log(`%c res `, "color: pink;border:1px solid pink", res);
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

  return (
    <main className="min-h-screen min-w-screen bg-main-screen">
      <div className="h-header-box border-b-2 border-chat-border flex justify-between flex-row gap-2 items-center px-4">
        <div></div>
        <motion.h3
          initial={{ width: "5px" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="text-amber-400 overflow-hidden text-nowrap text-center"
        >
          Meet the AI incarnation of myself
        </motion.h3>
        <Popover>
          <PopoverTrigger>
            <Info size="24px" color="white" />
          </PopoverTrigger>
          <PopoverContent className="bg-main-screen text-white">
            <ol className="space-y-2">
              <li className="text-[10px]">
                1: Knowledgeable : Equipped with information about your
                preferences and expertise.
              </li>
              <li className="text-[10px]">
                2: Contextual Understanding : Capable of interpreting questions
                and providing relevant answers.
              </li>
              <li className="text-[10px]">
                3: Reliable : Consistently delivers accurate and coherent
                responses.
              </li>
              <li className="text-[10px]">
                4: Time-saving : Handles inquiries efficiently, freeing up your
                time for other tasks.
              </li>

              <li className="text-[10px]">
                5: Continuously Learning : Adapts and improves over time to
                better represent you.
              </li>
            </ol>
          </PopoverContent>
        </Popover>
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
