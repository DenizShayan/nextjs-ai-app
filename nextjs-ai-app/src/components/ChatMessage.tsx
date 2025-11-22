// src/components/ChatMessage.tsx
import React from "react";

type ChatMessageProps = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatMessage({ sender, text }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-slate-700 text-slate-100 rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
