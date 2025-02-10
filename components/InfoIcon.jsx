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
      <PopoverTrigger>
        <Info size="24px" color="white" />
      </PopoverTrigger>
      <PopoverContent className="bg-main-screen text-white">
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
