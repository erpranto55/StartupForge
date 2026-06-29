"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient, useSession } from "@/lib/auth-client";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: session, isPending: sessionPending } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const callbackUrl = searchParams.get("callbackUrl");

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            toast.error(`Authentication error: ${error.replace(/_/g, " ")}`);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!sessionPending && session) {
            router.replace("/profile");
        }
    }, [session, sessionPending, router]);

    if (sessionPending || session) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
            </div>
        );
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const result = await authClient.signIn.email(
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    onSuccess: async () => {
                        // Generate JWT Cookie
                        const jwtRes = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/jwt`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ email: data.email }),
                                credentials: "include",
                            }
                        );
                        const jwtData = await jwtRes.json();
                        if (jwtData.success && jwtData.token) {
                            document.cookie = `token=${jwtData.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

                            // Decode JWT to redirect directly to role-based dashboard
                            try {
                                const base64Url = jwtData.token.split(".")[1];
                                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                                const payload = JSON.parse(atob(base64));
                                const role = payload?.role || "collaborator";

                                const ROLE_DASHBOARD_MAP = {
                                    founder: "/dashboard/founder",
                                    collaborator: "/dashboard/collaborator",
                                    admin: "/dashboard/admin",
                                };
                                const correctPath = ROLE_DASHBOARD_MAP[role] ?? "/dashboard";

                                toast.success("Login Successful");
                                router.push(callbackUrl?.startsWith("/dashboard") ? callbackUrl : correctPath);
                                return;
                            } catch (e) {
                                console.error("Error decoding token", e);
                            }
                        }

                        toast.success("Login Successful");
                        router.push(callbackUrl?.startsWith("/dashboard") ? callbackUrl : "/dashboard");
                    },

                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                }
            );
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div>
                <h2 className="text-4xl font-black text-brand-ink">
                    Welcome Back
                </h2>

                <p className="mt-3 text-gray-500">
                    Login to continue your startup journey.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
            >
                {/* Email */}
                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Your Email"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="font-medium">
                            Password
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-brand-primary"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            {...register("password", { required: "Password is required" })}
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Your Password"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-12 outline-none transition focus:border-brand-primary"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary font-semibold text-white transition hover:bg-[#851f85]"
                >
                    {loading ? "Logging In..." : "Login"}

                    <ArrowRight size={18} />
                </button>

                {/* Divider */}
                <div className="relative py-2 text-center">
                    <div className="absolute left-0 top-1/2 h-px w-full bg-gray-200" />

                    <span className="relative bg-white px-4 text-sm text-gray-500">
                        OR
                    </span>
                </div>

                {/* Google */}
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            await authClient.signIn.social({
                                provider: "google",
                                callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL?.replace(/\/$/, "")}/dashboard${
                                    callbackUrl
                                        ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
                                        : ""
                                }`,
                                errorURL: `${process.env.NEXT_PUBLIC_CLIENT_URL?.replace(/\/$/, "")}/register`,
                            });
                        } catch (err) {
                            console.error(err);
                            toast.error("Google login failed");
                        }
                    }}
                    className="h-12 w-full rounded-xl border border-gray-200 font-medium transition hover:bg-gray-50"
                >
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-brand-primary"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
