"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

const opportunitySchema = z.object({
    roleTitle: z
        .string()
        .min(3, "Role title must be at least 3 characters"),

    requiredSkills: z
        .string()
        .min(3, "Required skills are required"),

    workType: z
        .string()
        .min(1, "Select work type"),

    commitmentLevel: z
        .string()
        .min(1, "Select commitment level"),

    deadline: z
        .string()
        .min(1, "Deadline is required"),
});

export default function CreateOpportunityForm() {
    const router = useRouter();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(opportunitySchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Get founder startup
            const startupRes = await axios.get(
                `/api/startups/founder/${user.email}`
            );

            if (
                !startupRes.data.success ||
                startupRes.data.data.length === 0
            ) {
                toast.error(
                    "Please create a startup before posting an opportunity."
                );
                return;
            }

            const startup = startupRes.data.data[0];

            const opportunity = {
                startup_id: startup._id,
                startup_name: startup.startup_name,

                role_title: data.roleTitle,

                required_skills: data.requiredSkills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),

                work_type: data.workType,

                commitment_level: data.commitmentLevel,

                deadline: data.deadline,

                description: "",

                founder_email: user.email,
            };

            const res = await axios.post(
                "/api/opportunities",
                opportunity
            );

            if (res.data.success) {
                toast.success(
                    "Opportunity created successfully"
                );

                reset();

                router.push(
                    "/dashboard/founder/opportunities"
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
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
                Opportunity Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Role Title */}
                <div>
                    <label className="mb-2 block font-medium">
                        Role Title
                    </label>

                    <input
                        {...register("roleTitle")}
                        placeholder="Frontend Developer"
                        className="w-full rounded-xl border border-gray-200 p-3"
                    />

                    {errors.roleTitle && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.roleTitle.message}
                        </p>
                    )}
                </div>

                {/* Deadline */}
                <div>
                    <label className="mb-2 block font-medium">
                        Application Deadline
                    </label>

                    <input
                        type="date"
                        {...register("deadline")}
                        className="w-full rounded-xl border border-gray-200 p-3"
                    />

                    {errors.deadline && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.deadline.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
                <label className="mb-2 block font-medium">
                    Required Skills
                </label>

                <input
                    {...register("requiredSkills")}
                    placeholder="React, Next.js, Tailwind CSS"
                    className="w-full rounded-xl border border-gray-200 p-3"
                />

                {errors.requiredSkills && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.requiredSkills.message}
                    </p>
                )}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Work Type */}
                <div>
                    <label className="mb-2 block font-medium">
                        Work Type
                    </label>

                    <select
                        {...register("workType")}
                        className="w-full rounded-xl border border-gray-200 p-3"
                    >
                        <option value="">
                            Select Work Type
                        </option>

                        <option value="Remote">
                            Remote
                        </option>

                        <option value="Hybrid">
                            Hybrid
                        </option>

                        <option value="On Site">
                            On Site
                        </option>
                    </select>

                    {errors.workType && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.workType.message}
                        </p>
                    )}
                </div>

                {/* Commitment */}
                <div>
                    <label className="mb-2 block font-medium">
                        Commitment Level
                    </label>

                    <select
                        {...register("commitmentLevel")}
                        className="w-full rounded-xl border border-gray-200 p-3"
                    >
                        <option value="">
                            Select Commitment
                        </option>

                        <option value="Part Time">
                            Part Time
                        </option>

                        <option value="Full Time">
                            Full Time
                        </option>

                        <option value="Contract">
                            Contract
                        </option>
                    </select>

                    {errors.commitmentLevel && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.commitmentLevel.message}
                        </p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-8 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
                {loading
                    ? "Creating..."
                    : "Create Opportunity"}
            </button>
        </form>
    );
}