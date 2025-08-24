import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

const ChatMessage = ({ message, isUser = false, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`flex items-start space-x-3 mb-6 ${
        isUser ? "flex-row-reverse space-x-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-r from-amber-400 to-orange-500"
        }`}
      >
        {isUser ? (
          <User size="18px" className="text-white" />
        ) : (
          <Bot size="18px" className="text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`max-w-[75%] ${isUser ? "ml-0" : "mr-0"}`}>
        <div
          className={`relative rounded-2xl px-4 py-3 backdrop-blur-sm shadow-lg ${
            isUser
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"
              : "bg-white/10 border border-white/20"
          }`}
        >
          <span
            className="text-white leading-relaxed text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          />

          {/* Message tail */}
          <div
            className={`absolute top-4 w-3 h-3 rotate-45 ${
              isUser
                ? "-right-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-r border-b border-purple-400/30"
                : "-left-1.5 bg-white/10 border-l border-b border-white/20"
            }`}
          ></div>
        </div>

        {/* Timestamp */}
        <div
          className={`mt-1 text-xs text-white/40 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
