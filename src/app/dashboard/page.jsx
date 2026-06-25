"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.push("/login");
            return;
        }

        const handleAuthAndRedirect = async () => {
            try {
                // Get Custom User Data to check role
                const res = await fetch(`http://localhost:5000/api/users/${session.user.email}`);
                let customUser = await res.json();

                if (customUser && customUser.isBlocked) {
                    await authClient.signOut();
                    router.push("/login?error=account_blocked");
                    return;
                }

                if (!customUser || customUser.message === "User not found") {
                    const urlRole = searchParams.get("role");
                    // Create User if doesn't exist (happens on first Google Login)
                    const userData = {
                        name: session.user.name,
                        email: session.user.email,
                        image: session.user.image || "",
                        role: urlRole || "collaborator", // Use role from URL or Default
                        isBlocked: false,
                    };

                    const createRes = await fetch("http://localhost:5000/api/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });
                    customUser = await createRes.json();
                    
                    // The backend POST returns { insertedId: ... }, so we can use userData
                    customUser = { ...userData, _id: customUser.insertedId };
                }

                // Generate JWT Cookie for Google Login users (and ensure it for everyone)
                await fetch("http://localhost:5000/api/custom-auth/jwt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: session.user.email }),
                    credentials: "include",
                });

                // Redirect based on role
                const userRole = customUser.role || "collaborator";
                if (userRole === "founder") {
                    router.push("/dashboard/founder");
                } else if (userRole === "admin") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard/collaborator");
                }
            } catch (err) {
                console.error(err);
                toast.error(`Dashboard error: ${err.message || "Unknown error"}`);
                router.push("/login");
            }
        };

        handleAuthAndRedirect();
    }, [session, isPending, router, searchParams]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand-primary border-t-transparent mx-auto"></div>
                <p className="text-xl font-medium text-brand-ink">Setting up your dashboard...</p>
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
