"use client";

import React,{ useState,FormEvent } from "react";

type ImageResponse = {
    imageUrl: string;
    usedPrompt?: string;
};

export default function ImagePage() {
    const [prompt,setPrompt]=useState("");
    const [image, setImage]=useState<ImageResponse |null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setImage(null);

        try
}