"use client"
import { useState } from "react";

export default function Mini(){
    const [msg, setMsg] = useState("Hello");

    const change = () => {
        setMsg("Changed!");
    };

    return (
        <div>
            <p>{msg}</p>
            <button onClick={change}> Click </button>
        </div>
    );
}