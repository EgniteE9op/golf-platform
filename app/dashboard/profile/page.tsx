"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email || "");
      }
    }

    getUser();
  }, [router, supabase]);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-4">Email: {email}</p>
      </div>
    </main>
  );
}