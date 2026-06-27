"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomUser from "@/hooks/useCustomUser";

export default function ProfileRedirectPage() {
    const router = useRouter();
    const { customUser, loading, session } = useCustomUser();

    useEffect(() => {
        if (loading) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        if (customUser?.role) {
            router.replace(`/dashboard/${customUser.role}/profile`);
        } else {
            // Fallback to general dashboard redirect if role not yet synced/found
            router.replace("/dashboard");
        }
    }, [customUser, loading, session, router]);

    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
                <p className="text-sm font-medium text-brand-plum">
                    Loading your profile…
                </p>
            </div>
        </div>
    );
}
