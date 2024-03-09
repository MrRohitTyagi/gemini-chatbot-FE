import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const TypingComponent = ({ text }) => {
  const [isLoading, setisLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const controls = useAnimation();

  console.log(
    `%c displayedText `,
    "color: yellow;border:1px solid lightgreen",
    displayedText
  );

  useEffect(() => {
    const animateTyping = async () => {
      setisLoading(true);
      for (let i = 0; i <= text.length; i += 2) {
        setDisplayedText(text.slice(0, i));

        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      setisLoading(false);
    };
    animateTyping();
  }, [text]);

  return (
    <div>
      <motion.span
        className={isLoading ? "animate-pulse" : ""}
        animate={controls}
      >
        {displayedText}
      </motion.span>
    </div>
  );
};

export default TypingComponent;
