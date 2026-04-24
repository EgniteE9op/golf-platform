"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-5">
        <h2 className="text-xl font-bold mb-8">My App</h2>

        <div className="space-y-4">

          <div
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer hover:text-gray-300"
          >
            Dashboard
          </div>

          <div
            onClick={() => router.push("/dashboard/profile")}
            className="cursor-pointer hover:text-gray-300"
          >
            Profile
          </div>

          <div
            onClick={logout}
            className="cursor-pointer text-red-400 hover:text-red-300"
          >
            Logout
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        <div className="bg-white p-6 rounded shadow">

          <h1 className="text-2xl font-bold mb-4">
            Dashboard
          </h1>

          {user && (
            <p className="mb-4">
              Welcome: <b>{user.email}</b>
            </p>
          )}

          <p className="text-gray-600">
            This is your main dashboard area.
          </p>

        </div>
      </div>

    </div>
  );
}