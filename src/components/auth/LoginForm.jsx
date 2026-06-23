"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowRight,
} from "lucide-react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                            {...register("email")}
                            type="email"
                            placeholder="Your Email"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
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
                            {...register("password")}
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
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary font-semibold text-white transition hover:bg-[#851f85]"
                >
                    Login
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