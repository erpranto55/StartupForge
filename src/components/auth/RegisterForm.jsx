"use client";

import Link from "next/link";
import Image from "next/image";
import uploadImage from "@/utils/uploadImage";
import { useForm } from "react-hook-form";
import { signUp, authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    Image as ImageIcon,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const router = useRouter();

    const { data: session, isPending: sessionPending } = useSession();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const searchParams = useSearchParams();
    const selectedRole = watch("role") || "collaborator";

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

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            });

            console.log(result);

            if (result.error) {
                toast.error(result.error.message);
                return;
            }

            let imageUrl = "";

            if (selectedImage) {
                setUploadingImage(true);

                imageUrl = await uploadImage(selectedImage);

                setUploadingImage(false);
            }

            const userData = {
                name: data.name,
                email: data.email,
                image: imageUrl,
                role: data.role,
                isBlocked: false,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            const savedUser = await response.json();

            console.log(savedUser);

            // Generate JWT Cookie
            await fetch(
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

            toast.success("Registration Successful!");
            router.replace("/dashboard");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
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
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your Name"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
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
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Your Email"
                            className="h-12 w-full rounded-xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-brand-primary"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Profile Image */}

                <div>
                    <label className="mb-2 block font-medium">
                        Profile Image
                    </label>

                    {preview && (
                        <div className="mb-4 flex justify-center">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={100}
                                height={100}
                                className="h-24 w-24 rounded-full border object-cover"
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full rounded-xl border border-gray-200 p-3"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                        JPG, PNG or WEBP
                    </p>
                </div>

                {/* Role */}
                <div>
                    <label className="mb-2 block font-medium">
                        Role
                    </label>

                    <select
                        {...register("role", { required: "Role is required" })}
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
                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
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
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: "Password requires one uppercase and one lowercase letter"
                                },
                            })}
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
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <button
                    disabled={loading || uploadingImage}
                    type="submit"
                    className="h-12 w-full rounded-xl bg-brand-primary font-semibold text-white"
                >
                    {loading || uploadingImage
                        ? "Creating Account..."
                        : "Create Account"}
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
                    onClick={async () => {
                        try {
                            await authClient.signIn.social({
                                provider: "google",
                                callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL?.replace(/\/$/, "")}/dashboard?role=${selectedRole}`,
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