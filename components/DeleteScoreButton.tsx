"use client";

import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function DeleteScoreButton({ id }: { id: string }) {
  const supabase = createClient();
  const router = useRouter();

  async function handleDelete() {
    const { error } = await supabase.from("scores").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Score deleted ✅");
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  );
}