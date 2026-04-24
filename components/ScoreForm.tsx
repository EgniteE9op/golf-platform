"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function ScoreForm() {
  const supabase = createClient();
  const router = useRouter();

  const [score, setScore] = useState("");
  const [course, setCourse] = useState("");

  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return alert("Login required");

    const { error } = await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
      course,
      round_date: new Date().toISOString().split("T")[0],
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Score added ✅");
      setScore("");
      setCourse("");
      router.refresh();
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-3 max-w-sm">
      <input
        className="border p-2"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <input
        className="border p-2"
        placeholder="Course Name"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 text-white rounded"
      >
        Save Score
      </button>
    </div>
  );
}