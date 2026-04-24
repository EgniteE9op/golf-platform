"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#1e3a8a,#020617_45%,#111827)] px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur">
        <h1 className="text-center text-3xl font-bold">Welcome Back ⛳</h1>
        <p className="mt-2 text-center text-sm text-gray-300">
          Login to track your golf scores
        </p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-gray-300 focus:border-green-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-gray-300 focus:border-green-400"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-green-400">
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
}