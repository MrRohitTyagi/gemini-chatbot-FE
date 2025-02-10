"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const baseurl = process.env.NEXT_PUBLIC_BE_BASE_URL;

async function getBiodata() {
  const { data } = await axios.get(baseurl + "/api/v1/get-summary");
  const { instructions, summery } = data || {};
  return { instructions, summery };
}
async function putSummery(summery) {
  await axios.put(baseurl + "/api/v1/put-summery", { text: summery });
}
async function putInstructions(summery) {
  await axios.put(baseurl + "/api/v1/put-instruntions", { text: summery });
}

const EditBio = () => {
  const [summery, setsummery] = useState("");
  const [instruntions, setinstruntions] = useState("");

  useEffect(() => {
    try {
      (async function () {
        const data = await getBiodata();
        console.log("data", data);
        setsummery(data.summery);
        setinstruntions(data.instructions);
      })();
    } catch (error) {
      console.log("error", error);
      setsummery(null);
    }
  }, []);

  function handleSubmitsummery() {
    putSummery(summery);
  }
  function handleSubmitins() {
    putInstructions(instruntions);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-white py-4 gap-4">
      <h1>Edit Bio</h1>
      <Textarea
        className="rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen "
        placeholder="Type your Summery here."
        value={summery}
        onChange={(e) => {
          setsummery(e.target.value);
        }}
      />
      <Button
        onClick={handleSubmitsummery}
        className="border-2 border-chat-border"
      >
        Submit Summery
      </Button>
      <h1>Edit Instructions</h1>
      <Textarea
        className="rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen "
        placeholder="Type your Instructions here."
        value={instruntions}
        onChange={(e) => {
          setinstruntions(e.target.value);
        }}
      />
      <Button onClick={handleSubmitins} className="border-2 border-chat-border">
        Submit instructions
      </Button>
      {/* <textarea className=" rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen " /> */}
    </div>
  );
};

export default EditBio;
