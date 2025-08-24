import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commonChatCss } from "@/constants";

const TypingComponent = ({ text, speed = 10, className = "", onTyping }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const throttleRef = useRef(null);

  // Throttle function with trailing execution
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    let lastArgs;

    return function (...args) {
      const currentTime = Date.now();
      lastArgs = args;

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, lastArgs);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  useEffect(() => {
    // Create throttled version of onTyping
    if (onTyping) {
      throttleRef.current = throttle(onTyping, 100); // 100ms throttle
    }

    setDisplayedText("");
    setIsComplete(false);

    const animateTyping = async () => {
      for (let i = 0; i <= text.length; i++) {
        setDisplayedText(text.slice(0, i));
        if (throttleRef.current) {
          throttleRef.current();
        }
        if (i === text.length) {
          setIsComplete(true);
        }

        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    };

    if (text) animateTyping();

    // Cleanup
    return () => {
      throttleRef.current = null;
    };
  }, [text, speed, onTyping, throttle]);

  return (
    <div className="relative inline-block" style={commonChatCss}>
      <span
        className={className}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </div>
  );

  return (
    <div className="relative inline-block">
      <span className={className}>{displayedText}</span>

      {/* Simple cursor */}
      <AnimatePresence>
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block ml-[1px] w-[2px] h-[1em] bg-current"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TypingComponent;
