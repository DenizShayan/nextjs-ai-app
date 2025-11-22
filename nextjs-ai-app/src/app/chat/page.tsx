// src/app/chat/page.tsx
"use client";

import React, { useState, KeyboardEvent } from "react";
import ChatMessage from "@/components/ChatMessage";

// Type for chat messages
type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Send message to AI (mock or real)
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: input.trim() };

    // Show user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response.");
      }

      const data = await res.json();

      const aiMessage: Message = {
        sender: "ai",
        text: data.reply ?? "No response from AI.",
      };

      // Show AI message
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send message with Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <header className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-100">
            Chat with AI
          </h1>
          <span className="text-xs text-slate-400">
            Built with Next.js & React
          </span>
        </header>

        {/* Messages area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[430px]">
          {messages.length === 0 && (
            <p className="text-sm text-slate-400 text-center">
              Start the conversation by typing a message below 👇
            </p>
          )}

          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
            />
          ))}

          {loading && (
            <p className="text-xs text-slate-400">AI is typing…</p>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-slate-700 px-3 py-2 flex gap-2">
          <input
            className="flex-1 bg-slate-900 text-slate-100 text-sm rounded-xl px-3 py-2 outline-none border border-slate-700 focus:border-blue-500"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-sm text-white font-medium px-4 py-2 rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}
