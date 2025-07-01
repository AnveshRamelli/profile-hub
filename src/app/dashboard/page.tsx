// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session: any = data.session;

      if (!session) {
        router.push("/login");
      } else {
        setUserEmail(session.user.email);
        setLoading(false);
      }
    };

    getSession();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10">Checking auth...</p>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Welcome to the Dashboard!
      </h1>
      <p className="text-gray-700">
        Logged in as: <strong>{userEmail}</strong>
      </p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
