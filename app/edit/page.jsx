"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner/Spinner";
const baseurl = process.env.NEXT_PUBLIC_BE_BASE_URL;

async function getBiodata() {
  const { data } = await axios.get(baseurl + "/api/v1/get-instructions");

  return data;
}

async function putInstructions(summery) {
  await axios.put(baseurl + "/api/v1/put-instructions", { text: summery });
}

const EditBio = () => {
  const [instruntions, setinstruntions] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async function () {
        const data = await getBiodata();
        setinstruntions(data);
        setIsLoading(false);
      })();
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  }, []);

  function handleSubmitins() {
    putInstructions(instruntions);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-white py-4 gap-4">
      {isLoading ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <Spinner style={{ height: "50px", width: "50px" }} />
        </div>
      ) : (
        <>
          <h1>Edit Instructions</h1>
          <Textarea
            className="rounded m-2 border-2 border-chat-border p-4 w-[90vw] h-[80vh] bg-main-screen "
            placeholder="Type your Instructions here."
            value={instruntions}
            onChange={(e) => {
              setinstruntions(e.target.value);
            }}
          />
          <Button
            onClick={handleSubmitins}
            className="border-2 border-chat-border"
          >
            Submit instructions
          </Button>
        </>
      )}
    </div>
  );
};

export default EditBio;
