"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import useCustomUser from "@/hooks/useCustomUser";

export default function ApplyOpportunityForm({
    opportunityId,
}) {
    const router = useRouter();

    const { user, loading: authLoading } = useAuth();
    const { customUser, loading: customLoading } = useCustomUser();

    const [loading, setLoading] =
        useState(false);

    const [opportunity, setOpportunity] =
        useState(null);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        const loadOpportunity = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/${opportunityId}`
                );

                if (res.data.success) {
                    setOpportunity(res.data.data);
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    "Failed to load opportunity."
                );
            }
        };

        if (opportunityId) {
            loadOpportunity();
        }
    }, [opportunityId]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const application = {
                opportunity_id:
                    opportunity._id,

                role_title:
                    opportunity.role_title,

                startup_name:
                    opportunity.startup_name,

                founder_email:
                    opportunity.founder_email,

                applicant_name:
                    user.name,

                applicant_email:
                    user.email,

                portfolio:
                    data.portfolioLink,

                motivation:
                    data.motivation,
            };

            const res = await axios.post(
                "/api/applications",
                application
            );

            if (res.data.success) {
                toast.success(
                    "Application submitted successfully"
                );

                reset();

                router.push(
                    "/dashboard/collaborator/applications"
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

    if (authLoading || customLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        router.replace(`/login?callbackUrl=/opportunities/${opportunityId}/apply`);
        return null;
    }

    if (customUser?.role !== "collaborator") {
        return (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <p className="font-bold text-red-500">Access Denied</p>
                <p className="mt-2 text-gray-500">Only collaborators can apply for startup opportunities.</p>
            </div>
        );
    }

    if (!opportunity) {
        return (
            <div className="py-10 text-center">
                Loading...
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl bg-white p-8 shadow-sm"
        >
            <div className="space-y-6">
                <div>
                    <label className="mb-2 block font-medium">
                        Role
                    </label>

                    <input
                        value={
                            opportunity.role_title
                        }
                        disabled
                        className="w-full rounded-xl border bg-gray-100 p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Startup
                    </label>

                    <input
                        value={
                            opportunity.startup_name
                        }
                        disabled
                        className="w-full rounded-xl border bg-gray-100 p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Your Email
                    </label>

                    <input
                        value={
                            user?.email || ""
                        }
                        disabled
                        className="w-full rounded-xl border bg-gray-100 p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Portfolio Link
                    </label>

                    <input
                        {...register(
                            "portfolioLink"
                        )}
                        placeholder="https://yourportfolio.com"
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Motivation Message
                    </label>

                    <textarea
                        rows={6}
                        {...register(
                            "motivation"
                        )}
                        placeholder="Tell the founder why you're a good fit..."
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white"
                >
                    {loading
                        ? "Submitting..."
                        : "Submit Application"}
                </button>
            </div>
        </form>
    );
}