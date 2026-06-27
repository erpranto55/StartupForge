"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import axios from "@/lib/axios";

/**
 * Fetches the custom MongoDB user record that contains our business fields
 * (role, isBlocked, etc.) — these don't exist on the Better Auth session user.
 *
 * Returns:
 *   customUser – full DB user object or null
 *   loading    – true while session or DB fetch is in flight
 *   error      – fetch error or null
 *   session    – raw Better Auth session
 */
export default function useCustomUser() {
    const { data: session, isPending: sessionPending } = useSession();
    const [customUser, setCustomUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Wait for session to resolve
        if (sessionPending) return;

        // No session → not logged in
        if (!session?.user?.email) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${session.user.email}`);
                if (!cancelled) {
                    setCustomUser(res.data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            cancelled = true;
        };
    }, [session, sessionPending]);

    return {
        customUser,
        loading: sessionPending || loading,
        error,
        session,
    };
}
