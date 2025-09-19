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
      className={`w-3 h-3 rounded-full transition-all duration-200 ${
        state === stateTypes.online
          ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
          : 'bg-red-400 shadow-lg shadow-red-400/50'
      }`}
    />
  );
};

export default BotOnline;
