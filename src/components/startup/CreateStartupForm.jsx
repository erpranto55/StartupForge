"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

export default function CreateStartupForm() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl bg-white p-8 shadow-sm"
        >
            <div className="grid gap-6 md:grid-cols-2">
                {/* Startup Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Name
                    </label>

                    <input
                        {...register("startupName")}
                        className="w-full rounded-xl border p-3"
                        placeholder="Startup Name"
                    />
                </div>

                {/* Founder Email */}
                <div>
                    <label className="mb-2 block font-medium">
                        Founder Email
                    </label>

                    <input
                        {...register("founderEmail")}
                        className="w-full rounded-xl border p-3"
                        placeholder="founder@email.com"
                    />
                </div>

                {/* Logo */}
                <div>
                    <label className="mb-2 block font-medium">
                        Logo
                    </label>

                    <input
                        type="file"
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                {/* Industry */}
                <div>
                    <label className="mb-2 block font-medium">
                        Industry
                    </label>

                    <select
                        {...register("industry")}
                        className="w-full rounded-xl border p-3"
                    >
                        <option>Artificial Intelligence</option>
                        <option>FinTech</option>
                        <option>HealthTech</option>
                        <option>EdTech</option>
                        <option>E-commerce</option>
                        <option>Cyber Security</option>
                    </select>
                </div>
            </div>

            {/* Funding Stage */}
            <div className="mt-6">
                <label className="mb-2 block font-medium">
                    Funding Stage
                </label>

                <select
                    {...register("fundingStage")}
                    className="w-full rounded-xl border p-3"
                >
                    <option>Idea Stage</option>
                    <option>Pre Seed</option>
                    <option>Seed</option>
                    <option>Series A</option>
                </select>
            </div>

            {/* Description */}
            <div className="mt-6 mb-4">
                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    {...register("description")}
                    rows={6}
                    className="w-full rounded-xl border p-3"
                    placeholder="Describe your startup..."
                />
            </div>

            <Link
                href="/dashboard/founder/startup/create"
                className="rounded-xl bg-brand-primary px-5 py-3  font-semibold text-white"
            >
                Create Startup
            </Link>
        </form>
    );
}