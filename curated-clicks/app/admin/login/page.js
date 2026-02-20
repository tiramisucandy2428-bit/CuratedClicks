"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn, loginAdmin } from "@/app/lib/contentStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.replace("/admin");
    }
  }, [router]);

  const onSubmit = (event) => {
    event.preventDefault();
    const ok = loginAdmin(username.trim(), password);
    if (!ok) {
      setError("Invalid credentials. Use your admin username/password.");
      return;
    }
    router.push("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Manage blogs and products from your dashboard.</p>

        <label className="mt-5 block text-sm">Username</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-amber-400"
          required
        />

        <label className="mt-4 block text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-amber-400"
          required
        />

        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}

        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-amber-500 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-amber-400"
        >
          Sign In
        </button>

        <p className="mt-3 text-xs text-zinc-500">Default demo credentials: admin / curated123</p>
      </form>
    </main>
  );
}
