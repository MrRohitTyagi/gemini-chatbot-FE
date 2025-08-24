import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypingComponent = ({ text, speed = 10, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    const animateTyping = async () => {
      for (let i = 0; i <= text.length; i++) {
        setDisplayedText(text.slice(0, i));
        
        if (i === text.length) {
          setIsComplete(true);
        }
        
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    };
    
    if (text) animateTyping();
  }, [text, speed]);

  return (
    <div className="relative inline-block">
      <span className={className}>
        {displayedText}
      </span>
      
      {/* Simple cursor */}
      <AnimatePresence>
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block ml-[1px] w-[2px] h-[1em] bg-current"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TypingComponent;
