"use client"

import { useState } from "react";

export default function Test3() {
    const [joke, setJoke] = useState("didn't got anything yet!");
    const [loading, setLoading] = useState(false);

    const getJoke = async () => {
        setLoading(true);

        try {
            const res = await fetch("https://official-joke-api.appspot.com/random_joke");
            const data = await res.json();

            setJoke(data.setup + " - " + data.punchline);
        } catch {
            setJoke("Failed to fetch a joke!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className = "min-h-screen bg-slate-900 text-white flex flex-col gap-4 items-center justify-center">
            <h1 className="text-xl font-semibold">Fetch Joke Practice</h1>"

            <p>{loading ? "Loading..." : joke}</p>

            <button 
                onClick={getJoke}
                className="bg-green-600 px-4 pu-2 rounded-md hover:bg-green-700 transition"
            >
                Get a Joke 🤣🤣🤣
            </button>
        </div>
    );
}