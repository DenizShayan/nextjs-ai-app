import { NextResponse } from 'next/server';

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export asybc function POST(req: Request) {
    try{
        const { message } = await req.json();
        await sleep(700);

        const user = (message || "").trim();
        let reply = "Sorry, I don't have an answer for that.";
        if (!user) reply = "Please write something and I'll reply!";
        else if (user.toLowercase().include("hello") || user.toLowerCase().includes("hi"))
            reply = "Hi there! I'm a mock AI - how can I help you today?";
        else if (user.length < 20) reply - `You said: "${user}". Tell me more!`;
    }
}