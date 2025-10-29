import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            <h1 className="text-white font-bold text-lg">AI App 🤖</h1>

            <ul className="flex space-x-4">
                <li>
                    <Link href="/" legacyBehavior>
                        <a className="hover:text-gray-400 text-white">
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/chat" legacyBehavior>
                        <a  className="hover:text-gray-400 text-white">
                            Chat
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/image" legacyBehavior>
                        <a  className="hover:text-gray-400 text-white">
                            Image Generator
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}