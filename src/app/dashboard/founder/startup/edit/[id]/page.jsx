"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "@/lib/axios";

export default function EditStartupPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Load Startup
    useEffect(() => {
        const loadStartup = async () => {
            try {
                const res = await axios.get(`/api/startups/${id}`);

                if (res.data.success) {
                    reset(res.data.data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load startup");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadStartup();
        }
    }, [id, reset]);

    // Update Startup
    const onSubmit = async (data) => {
        try {
            setUpdating(true);

            delete data._id;

            const res = await axios.patch(
                `/api/startups/${id}`,
                data
            );

            if (res.data.success) {
                toast.success("Startup updated successfully");
                router.push("/dashboard/founder/startup");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">
            <h1 className="mb-8 text-4xl font-black text-brand-ink">
                Edit Startup
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
                            required: "Startup name is required",
                        })}
                        className="w-full rounded-xl border p-3"
                    />

                    {errors.startup_name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.startup_name.message}
                        </p>
                    )}
                </div>

                {/* Logo URL */}
                <div>
                    <label className="mb-2 block font-medium">
                        Logo URL
                    </label>

                    <input
                        {...register("logo", {
                            required: "Logo is required",
                        })}
                        className="w-full rounded-xl border p-3"
                    />

                    {errors.logo && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.logo.message}
                        </p>
                    )}
                </div>

                {/* Industry */}
                <div>
                    <label className="mb-2 block font-medium">
                        Industry
                    </label>

                    <input
                        {...register("industry", {
                            required: "Industry is required",
                        })}
                        className="w-full rounded-xl border p-3"
                    />

                    {errors.industry && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.industry.message}
                        </p>
                    )}
                </div>

                {/* Funding Stage */}
                <div>
                    <label className="mb-2 block font-medium">
                        Funding Stage
                    </label>

                    <select
                        {...register("funding_stage", {
                            required:
                                "Funding stage is required",
                        })}
                        className="w-full rounded-xl border p-3"
                    >
                        <option value="Bootstrapped">
                            Bootstrapped
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
                        <option value="Series B">
                            Series B
                        </option>
                        <option value="Series C">
                            Series C
                        </option>
                    </select>

                    {errors.funding_stage && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.funding_stage.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        {...register("description", {
                            required:
                                "Description is required",
                        })}
                        className="w-full rounded-xl border p-3"
                    />

                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={updating}
                        className="rounded-xl bg-brand-primary px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {updating
                            ? "Updating..."
                            : "Update Startup"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/dashboard/founder/startup"
                            )
                        }
                        className="rounded-xl border border-gray-300 px-8 py-3 font-semibold transition hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}