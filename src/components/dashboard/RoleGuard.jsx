"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import useCustomUser from "@/hooks/useCustomUser";
import DashboardShell from "./DashboardShell";
import { roleDashboardPath } from "@/constants/roleBasedNavigation";

/**
 * Client-side RBAC guard.
 *
 * Performs three checks before rendering the DashboardShell:
 *   1. User must have an active Better Auth session.
 *   2. User's DB role must match `allowedRole`.
 *   3. User must not be blocked.
 *
 * While checking → shows a full-screen spinner.
 * On failure → redirects silently (middleware already handles this at the edge,
 *              but this provides a belt-and-suspenders client-side guarantee).
 *
 * Props:
 *   allowedRole – "founder" | "collaborator" | "admin"
 *   children    – the page content rendered inside DashboardShell
 */
export default function RoleGuard({ allowedRole, children }) {
    const router = useRouter();
    const { customUser, loading, error, session } = useCustomUser();

    useEffect(() => {
        if (loading) return;

        // Not authenticated
        if (!session) {
            router.replace("/login");
            return;
        }

        // User does not exist in our DB yet (edge case: cleared DB)
        if (!customUser) return; // let it render; next refresh will resolve

        // Blocked account → force sign out
        if (customUser.isBlocked) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/logout`, {
                method: "POST",
                credentials: "include",
            }).catch(console.error);
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            authClient.signOut().then(() => {
                router.replace("/login?error=account_blocked");
            });
            return;
        }

        // Wrong role → redirect to the correct dashboard
        if (customUser.role !== allowedRole) {
            const correctPath =
                roleDashboardPath[customUser.role] ?? "/dashboard";
            router.replace(correctPath);
        }
    }, [loading, session, customUser, allowedRole, router]);

    // ── Loading state ──
    if (loading || (!customUser && session)) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-brand-blush">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
                    <p className="text-sm font-medium text-brand-plum">
                        Verifying access…
                    </p>
                </div>
            </div>
        );
    }

    // ── Error fallback ──
    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-brand-blush">
                <div className="text-center">
                    <p className="text-lg font-bold text-brand-ink">
                        Unable to load your profile
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Please check your connection and refresh.
                    </p>
                </div>
            </div>
        );
    }

    // ── Role mismatch (redirect in progress) ──
    if (customUser?.role !== allowedRole) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-brand-blush">
                <div className="size-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
            </div>
        );
    }

    // ── All checks passed → render shell + page ──
    return (
        <DashboardShell role={allowedRole} customUser={customUser}>
            {children}
        </DashboardShell>
    );
}
