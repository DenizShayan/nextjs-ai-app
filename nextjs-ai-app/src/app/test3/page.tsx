"use client"

import {useState} from "react";

export default function Test3(){
    const [joke, setJoke] = useState("didn't got anything yet!");
    const [loading, setLoading] = useState(false);

    const getJoke = async () => {
        setLoading(true);

        try{
            const res = await fetch("https://official-joke-api.appspot.com/random_joke");
            
        }
}