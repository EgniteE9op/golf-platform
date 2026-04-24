"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function Settings() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully ✅");
      setNewPassword("");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded shadow w-96">

        <p className="mb-2">Change Password</p>

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={updatePassword}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}