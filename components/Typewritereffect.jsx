import React, { useState, useEffect, useRef, useCallback } from "react";
import { commonChatCss } from "@/constants";

const TypingComponent = ({ text, speed = 15, className = "", onTyping }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const throttleRef = useRef(null);

  // Extract plain text content from HTML for typing calculation
  const getPlainTextLength = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent?.length || 0;
  };

  // Get visible text up to a certain character count
  const getTextUpToIndex = (htmlString, targetIndex) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    let currentIndex = 0;
    let result = '';

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (currentIndex + text.length <= targetIndex) {
          result += text;
          currentIndex += text.length;
        } else {
          result += text.slice(0, targetIndex - currentIndex);
          currentIndex = targetIndex;
          return true; // Stop processing
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const attributes = Array.from(node.attributes)
          .map(attr => `${attr.name}="${attr.value}"`)
          .join(' ');

        result += `<${tagName}${attributes ? ' ' + attributes : ''}>`;

        for (const child of node.childNodes) {
          if (processNode(child)) return true;
        }

        result += `</${tagName}>`;
      }
      return false;
    };

    for (const child of tempDiv.childNodes) {
      if (processNode(child)) break;
    }

    return result;
  };

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
      const plainTextLength = getPlainTextLength(text);

      for (let i = 0; i <= plainTextLength; i++) {
        const partialText = getTextUpToIndex(text, i);
        setDisplayedText(partialText);

        if (throttleRef.current) {
          throttleRef.current();
        }

        if (i === plainTextLength) {
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

  const cursorHtml = !isComplete
    ? '<span class="cursor-blink" style="display:inline-block;width:2px;height:1em;background-color:rgb(96 165 250);vertical-align:baseline;margin-left:1px;animation:blink 0.6s infinite;"></span>'
    : '';

  const displayWithCursor = displayedText + cursorHtml;

  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 0.6s infinite;
        }
      `}</style>
      <div className="relative" style={commonChatCss}>
        <span
          className={className}
          dangerouslySetInnerHTML={{
            __html: displayWithCursor,
          }}
        />
      </div>
    </>
  );
};

export default TypingComponent;
