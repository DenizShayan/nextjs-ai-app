"use client";

import React, { useState, FormEvent } from "react";

type ImageResponse = {
    imageUrl: string;
    usedPrompt?: string;
};

export default function ImagePage() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState<ImageResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setImage(null);

        try {
            const res = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Failed to generate image.");
            }

            const data: ImageResponse = await res.json();
            setImage(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-900  flex items-center justify-center px-4" >
            <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl shadow-lg overflow-hidden flex flex-col ">
                <header className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-slate-100">AI Image Generator (mock)
                    </h1>
                    <span className="text-xs text-slate-400">
                        Next.js • App Router • API Routes
                    </span>
                </header>

                <form onSubmit={handleSubmit} className="p-4 space-y-3 border-b border-slate-700">
                    <label className="block text-slate-100 font-medium mb-2">
                        Enter a prompt for the image
                    </label>
                    <input
                        className="w-full bg-slate-900 text-slate-100 tesr-sm rounded-xl px-3 pt-2 outline-none border border-slate-700 focus:border-blue-500"
                        placeholder="A futuristic sity at night, in cyberpunk style..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full by-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-sm text-white font-medium px-4 py-2 rounded-xl">
                        {isLoading ? "Generating..." : "Generate Image"}
                    </button>

                    {error && (
                        <p className="text-xs text-red-400 mt-1">
                            {error}
                        </p>
                    )
                    }
                </form>

                <div className="p-4 flex-1 flex-col item-center justify-center">
                    {!image && !isLoading && !error && (
                        <p className="text-sm text-slate-400 text-center">
                            submit a prompt to generate a random mock image
                            Later we can connect this to a real AI image API.
                        </p>
                    )}

                    {isLoading && (
                        <p className="text-sm text-slate-300">AI is generating an image...</p>
                    )}

                    {image && (
                        <div className="w-full flex flex-col items-center gap-3">
                            {image.usedPrompt && (
                                <p className="text-xs text-slate-400 text-center">
                                    promt: <span className="text-slate-200">{image.usedPrompt}</span>
                                </p>
                            )}
                            <img
                                src={image.imageUrl}
                                alt={image.usedPrompt || "Generated Image"}
                                className="max-h-[400px] rounded-xl border border-slate-700 object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}