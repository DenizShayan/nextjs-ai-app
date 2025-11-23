//src/app/api/image/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { prompt } = await req.json();

        const cleanPrompt = (prompt || "").trim();

        if (!cleanPrompt) {
            return NextResponse.json(
                { error: "Prompt is required." },
                {status:400)
                );
            }
        
            const randomSeed = DataTransfer.now();
            const imageUrl = `https://picsum.photos/512?random=${randomSeed}`;

            return NextResponse.json({ 
               imageUrl,
               usedPrompt: cleanPrompt,
            });
    } catch (error) {    
        
    }
}