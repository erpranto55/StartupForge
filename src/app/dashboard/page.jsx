"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const handleAuthAndRedirect = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/users/${session.user.email}`
                );
                let customUser = await res.json();

                if (customUser && customUser.isBlocked) {
                    try {
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/logout`, {
                            method: "POST",
                            credentials: "include",
                        });
                    } catch (err) {
                        console.error(err);
                    }
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    await authClient.signOut();
                    router.replace("/login?error=account_blocked");
                    return;
                }

                if (!customUser || customUser.message === "User not found") {
                    const urlRole = searchParams.get("role");
                    const userData = {
                        name: session.user.name,
                        email: session.user.email,
                        image: session.user.image || "",
                        role: urlRole || "collaborator",
                        isBlocked: false,
                    };

                    const createRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/users`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });
                    customUser = await createRes.json();
                    customUser = { ...userData, _id: customUser.insertedId };
                }

                const jwtRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/jwt`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: session.user.email }),
                    credentials: "include",
                });
                const jwtData = await jwtRes.json();
                if (jwtData.success && jwtData.token) {
                    document.cookie = `token=${jwtData.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
                }

                const callbackUrl = searchParams.get("callbackUrl");
                if (callbackUrl?.startsWith("/dashboard")) {
                    router.replace(callbackUrl);
                    return;
                }

                const userRole = customUser.role || "collaborator";
                if (userRole === "founder") {
                    router.replace("/dashboard/founder");
                } else if (userRole === "admin") {
                    router.replace("/dashboard/admin");
                } else {
                    router.replace("/dashboard/collaborator");
                }
            } catch (err) {
                console.error(err);
                toast.error(`Dashboard error: ${err.message || "Unknown error"}`);
                router.replace("/login");
            }
        };

        handleAuthAndRedirect();
    }, [session, isPending, router, searchParams]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
                <p className="text-xl font-medium text-brand-ink">
                    Setting up your dashboard...
                </p>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
