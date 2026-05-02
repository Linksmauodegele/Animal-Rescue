"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Neteisingas el. paštas arba slaptažodis.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#e8d8be] max-w-sm w-full mx-4 text-center">
        <h1 className="font-display text-2xl font-bold text-[#1e1a17] mb-2">Prisijungimas</h1>
        <p className="text-[#7a5c40] text-sm mb-6">Valdymo skydelis</p>

        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30"
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30"
        />

        {error && (
          <p className="text-red-600 text-xs mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {loading ? "Jungiamasi..." : "Prisijungti"}
        </button>

        <a href="/" className="block mt-4 text-sm text-[#c4622d] hover:underline">
          Atgal į svetainę
        </a>
      </div>
    </div>
  );
}
