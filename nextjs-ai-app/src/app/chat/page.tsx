'use client';

import React, { useState } from 'react';
// import { ChatMessage } from '@/types';
import ChatMessage from '@/components/chatMessage';

export default function ChatPage() {
    const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    //send message to mock AI route
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = amait fetch("/chat", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!res.ok) throw new Error("Failed to fetch response.");

            const data = await res.json();
            const aiMessage = { sender: "ai", text: data.reply };

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

    //send with enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className='flex-1 overflow-y-auto p-4'>

}