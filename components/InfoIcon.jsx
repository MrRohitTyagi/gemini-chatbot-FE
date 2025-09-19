import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

const InfoIcon = () => {
  return (
    <Popover className="w-full">
      <PopoverTrigger className="p-1.5 sm:p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 transition-all duration-200">
        <Info size="16px" className="sm:w-[18px] sm:h-[18px] text-slate-300" />
      </PopoverTrigger>
      <PopoverContent className="bg-slate-800/90 border border-slate-700/50 backdrop-blur-sm text-white shadow-xl">
        <ol className="space-y-2">
          <li className="text-[14px]">
            1: Knowledgeable : Equipped with information about my preferences
            and expertise.
          </li>
          <li className="text-[14px]">
            2: Contextual Understanding : Capable of interpreting questions and
            providing relevant answers.
          </li>
          <li className="text-[14px]">
            3: Reliable : Consistently delivers accurate and coherent
            responses.(sometimes not)
          </li>
          <li className="text-[14px]">
            4: Time-saving : Handles inquiries efficiently, freeing up your time
            for other tasks.
          </li>

          <li className="text-[14px]">
            5: Continuously Learning : Adapts and improves over time to better
            represent you.
          </li>
        </ol>
      </PopoverContent>
    </Popover>
  );
};

export default InfoIcon;
