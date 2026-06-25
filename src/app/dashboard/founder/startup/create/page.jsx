"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import axiosInstance from "@/lib/axios";
import { uploadImage } from "@/utils/uploadImage";
import useAuth from "@/hooks/useAuth";

export default function CreateStartupPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Check if startup already exists

            const existing = await axiosInstance.get(
                `/api/startups/founder/${user.email}`
            );

            if (
                existing.data.success &&
                existing.data.data.length > 0
            ) {
                setLoading(false);
                toast.error("You already created a startup");

                return;
            }

            // Upload logo
            const image = await uploadImage(data.logo[0]);

            // Startup data
            const startup = {
                startup_name: data.startup_name,
                logo: image,
                industry: data.industry,
                description: data.description,
                funding_stage: data.funding_stage,
                founder_email: user.email,
            };

            // Save startup
            const res = await axiosInstance.post(
                "/api/startups",
                startup
            );

            if (res.data.success) {
                toast.success("Startup Created Successfully");

                reset();

                router.push("/dashboard/founder/startup");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-lg">
            <h1 className="mb-8 text-3xl font-bold">
                Create Startup
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Startup Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Name
                    </label>

                    <input
                        {...register("startup_name", {
                            required: true,
                        })}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                {/* Logo */}
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Logo
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("logo", {
                            required: true,
                        })}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                {/* Industry */}
                <div>
                    <label className="mb-2 block font-medium">
                        Industry
                    </label>

                    <input
                        {...register("industry", {
                            required: true,
                        })}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                {/* Funding Stage */}
                <div>
                    <label className="mb-2 block font-medium">
                        Funding Stage
                    </label>

                    <select
                        {...register("funding_stage", {
                            required: true,
                        })}
                        className="w-full rounded-xl border p-3"
                    >
                        <option value="">
                            Select Stage
                        </option>
                        <option>Bootstrapped</option>
                        <option>Pre-Seed</option>
                        <option>Seed</option>
                        <option>Series A</option>
                        <option>Series B</option>
                        <option>Series C</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        {...register("description", {
                            required: true,
                        })}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                {/* Founder Email */}
                <div>
                    <label className="mb-2 block font-medium">
                        Founder Email
                    </label>

                    <input
                        value={user?.email || ""}
                        disabled
                        className="w-full rounded-xl border bg-gray-100 p-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-brand-primary px-8 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                    {loading
                        ? "Creating..."
                        : "Create Startup"}
                </button>
            </form>
        </div>
    );
}