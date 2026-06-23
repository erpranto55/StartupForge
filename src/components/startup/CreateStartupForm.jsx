"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

const startupSchema = z.object({
    startupName: z
        .string()
        .min(
            3,
            "Startup name must be at least 3 characters"
        ),

    founderEmail: z
        .string()
        .email("Enter a valid email"),

    industry: z
        .string()
        .min(1, "Industry is required"),

    fundingStage: z
        .string()
        .min(
            1,
            "Funding stage is required"
        ),

    description: z
        .string()
        .min(
            20,
            "Description must be at least 20 characters"
        ),
});

export default function CreateStartupForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(startupSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            console.log(data);

            toast.success(
                "Startup validation completed successfully"
            );
        } catch (error) {
            toast.error(
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl bg-white p-8 shadow-sm"
        >
            <h2 className="mb-8 text-2xl font-bold text-brand-ink">
                Startup Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Startup Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Name
                    </label>

                    <input
                        {...register(
                            "startupName"
                        )}
                        placeholder="Startup Name"
                        className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-brand-primary"
                    />

                    {errors.startupName && (
                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors
                                    .startupName
                                    .message
                            }
                        </p>
                    )}
                </div>

                {/* Founder Email */}
                <div>
                    <label className="mb-2 block font-medium">
                        Founder Email
                    </label>

                    <input
                        {...register(
                            "founderEmail"
                        )}
                        type="email"
                        placeholder="founder@email.com"
                        className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-brand-primary"
                    />

                    {errors.founderEmail && (
                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors
                                    .founderEmail
                                    .message
                            }
                        </p>
                    )}
                </div>

                {/* Logo */}
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Logo
                    </label>

                    <input
                        type="file"
                        className="w-full rounded-xl border border-gray-200 p-3"
                    />
                </div>

                {/* Industry */}
                <div>
                    <label className="mb-2 block font-medium">
                        Industry
                    </label>

                    <select
                        {...register(
                            "industry"
                        )}
                        className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-brand-primary"
                    >
                        <option value="">
                            Select Industry
                        </option>

                        <option value="Artificial Intelligence">
                            Artificial Intelligence
                        </option>

                        <option value="FinTech">
                            FinTech
                        </option>

                        <option value="HealthTech">
                            HealthTech
                        </option>

                        <option value="EdTech">
                            EdTech
                        </option>

                        <option value="E-commerce">
                            E-commerce
                        </option>

                        <option value="Cyber Security">
                            Cyber Security
                        </option>
                    </select>

                    {errors.industry && (
                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors
                                    .industry
                                    .message
                            }
                        </p>
                    )}
                </div>
            </div>

            {/* Funding Stage */}
            <div className="mt-6">
                <label className="mb-2 block font-medium">
                    Funding Stage
                </label>

                <select
                    {...register(
                        "fundingStage"
                    )}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-brand-primary"
                >
                    <option value="">
                        Select Funding Stage
                    </option>

                    <option value="Idea Stage">
                        Idea Stage
                    </option>

                    <option value="Pre Seed">
                        Pre Seed
                    </option>

                    <option value="Seed">
                        Seed
                    </option>

                    <option value="Series A">
                        Series A
                    </option>
                </select>

                {errors.fundingStage && (
                    <p className="mt-1 text-sm text-red-500">
                        {
                            errors
                                .fundingStage
                                .message
                        }
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="mt-6">
                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    {...register(
                        "description"
                    )}
                    rows={6}
                    placeholder="Describe your startup..."
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-brand-primary"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        {
                            errors
                                .description
                                .message
                        }
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="
                mt-8
                rounded-xl
                bg-brand-primary
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
            >
                {loading
                    ? "Creating..."
                    : "Create Startup"}
            </button>
        </form>
    );
}