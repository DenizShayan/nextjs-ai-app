import React from "react";

export default function navbar()=> {
    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            <h1 className="text-white font-hold text-lg">AI App 🤖</h1>

            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="hover:text-gray-400 text-white">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/chat" className="hover:text-gray-400 text-white">
                        Chat
                    </Link>
                </li>
                <li>
                    <Link href="/image" className="hover:text-gray-400 text-white">
                        Image Generator
                    </Link>
                </li>
            </ul>
            </nav>
        };
}