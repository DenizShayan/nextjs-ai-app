"use client";

import { useState } from "react";

export default function TestPage() {
  const [text, setText] = useState("هنوز هیچ دیتایی نیاوردم!");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    setText("در حال دریافت داده...");

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await res.json();

      setText(data.title);
    } catch (error) {
      setText("خطا در دریافت داده!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col gap-4 items-center justify-center text-white">
      <h1 className="text-xl font-bold">تمرین Fetch + State</h1>

      <p className="text-lg">{text}</p>

      <button
        onClick={getData}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded-md"
      >
        {loading ? "صبر کن..." : "دریافت اطلاعات"}
      </button>
    </div>
  );
}
