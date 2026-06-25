"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
      setLoading(false);
    });
  }, []);

  return {
    session,
    loading,
    user: session?.user,
  };
}
