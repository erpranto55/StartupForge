"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    Image as ImageIcon,
} from "lucide-react";

import { useState } from "react";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-black text-brand-ink">
                Create Account
            </h2>

            <p className="mt-3 text-gray-500">
                Join StartupForge today.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
            >
                {/* Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Full Name
                    </label>

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Your Name"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
                </div>

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

                {/* Image URL */}
                <div>
                    <label className="mb-2 block font-medium">
                        Image URL
                    </label>

                    <div className="relative">
                        <ImageIcon
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            {...register("image")}
                            type="text"
                            placeholder="https://..."
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
                </div>

                {/* Role */}
                <div>
                    <label className="mb-2 block font-medium">
                        Role
                    </label>

                    <select
                        {...register("role")}
                        className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-brand-primary"
                    >
                        <option value="">
                            Select Role
                        </option>

                        <option value="founder">
                            Founder
                        </option>

                        <option value="collaborator">
                            Collaborator
                        </option>
                    </select>
                </div>

                {/* Password */}
                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>

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
                            placeholder="********"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-12 outline-none transition focus:border-brand-primary"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
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

                {/* Submit */}
                <button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-brand-primary font-semibold text-white transition hover:bg-brand-dark"
                >
                    Create Account
                </button>

                {/* Divider */}
                <div className="relative py-2 text-center">
                    <span className="bg-white px-3 text-sm text-gray-500">
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
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-brand-primary"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}