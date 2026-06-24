"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ApplyOpportunityForm() {
    const [loading, setLoading] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            console.log(data);

            toast.success(
                "Application submitted successfully"
            );

            reset();
        } catch {
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
            <div className="space-y-6">
                <div>
                    <label className="mb-2 block font-medium">
                        Portfolio Link
                    </label>

                    <input
                        {...register(
                            "portfolioLink"
                        )}
                        placeholder="https://your-portfolio.com"
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Motivation Message
                    </label>

                    <textarea
                        {...register(
                            "motivation"
                        )}
                        rows={6}
                        placeholder="Tell the founder why you are a good fit..."
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                    {loading
                        ? "Submitting..."
                        : "Submit Application"}
                </button>
            </div>
        </form>
    );
}