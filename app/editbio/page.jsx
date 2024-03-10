"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const baseurl = process.env.NEXT_PUBLIC_BE_BASE_URL;

async function getBiodata() {
  const { data } = await axios.get(baseurl + "/api/vi/get-bio");
  return data;
}
async function putBiodata(value) {
  await axios.put(baseurl + "/api/vi/put-bio", { text: value });
}

const EditBio = () => {
  const [value, setvalue] = useState("");
  console.log(`%c value `, "color: green;border:1px solid green", value);
  useEffect(() => {
    try {
      (async function () {
        const data = await getBiodata();
        setvalue(data);
      })();
    } catch (error) {
      console.log("error", error);
      setvalue(null);
    }
  }, []);

  function handleSubmit() {
    putBiodata(value);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-white py-4 gap-4">
      <h1>Edit Bio</h1>
      <Textarea
        className="rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen "
        placeholder="Type your bio here."
        value={value}
        onChange={(e) => {
          setvalue(e.target.value);
        }}
      />
      <Button onClick={handleSubmit} className="border-2 border-chat-border">
        Submit
      </Button>
      {/* <textarea className=" rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen " /> */}
    </div>
  );
};

export default EditBio;
