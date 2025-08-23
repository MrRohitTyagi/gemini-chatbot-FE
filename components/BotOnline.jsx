"use client";

import React, { useEffect, useState } from "react";

import { CheckCircle, BatteryWarning, Tag } from "lucide-react";
import Spinner from "./Spinner/Spinner";
import { checkAvailability } from "@/controllers/geminiResponse";

const stateTypes = {
  loading: "loading",
  online: "online",
  offline: "offline",
};

const BotOnline = () => {
  const [state, setState] = useState(stateTypes.loading);

  useEffect(() => {
    async function init() {
      try {
        const response = await checkAvailability();
        console.log("response", response);
        if (response) {
          setState(stateTypes.online);
        } else {
          setState(stateTypes.offline);
        }
      } catch (error) {
        console.error("Error checking bot availability:", error);
        setState(stateTypes.offline);
      }
    }
    init();
  }, []);

  return state === stateTypes.loading ? (
    <Spinner
      style={{
        height: "20px",
        width: "20px",
      }}
    />
  ) : (
    <div
      className=""
      style={{
        border: `1px solid ${state === stateTypes.online ? "green" : "red"}`,
        borderRadius: "5px",
        padding: "2px 5px",
        display: "flex",
        alignItems: "center",
        gap: "5px",

        fontSize: "12px",
        color: "white",
      }}
    >
      {state === stateTypes.online ? (
        <CheckCircle color="green" size="1rem" />
      ) : (
        <BatteryWarning color="red" size="1rem" />
      )}
      {state === stateTypes.online ? "online" : "offline"}
    </div>
  );
};

export default BotOnline;
