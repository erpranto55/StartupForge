"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import axios from "@/lib/axios";

export default function EditOpportunityPage() {
    const { id } = useParams();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        const loadOpportunity = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/${id}`
                );

                if (res.data.success) {
                    const opportunity = res.data.data;

                    reset({
                        role_title:
                            opportunity.role_title,

                        required_skills:
                            opportunity.required_skills.join(
                                ", "
                            ),

                        work_type:
                            opportunity.work_type,

                        commitment_level:
                            opportunity.commitment_level,

                        deadline:
                            opportunity.deadline,

                        description:
                            opportunity.description,
                    });
                }
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load opportunity"
                );
            } finally {
                setLoading(false);
            }
        };

        loadOpportunity();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            setUpdating(true);

            const updatedOpportunity = {
                role_title: data.role_title,

                required_skills: data.required_skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),

                work_type: data.work_type,

                commitment_level:
                    data.commitment_level,

                deadline: data.deadline,

                description: data.description,
            };

            const res = await axios.patch(
                `/api/opportunities/${id}`,
                updatedOpportunity
            );

            if (res.data.success) {
                toast.success(
                    "Opportunity updated successfully"
                );

                router.push(
                    "/dashboard/founder/opportunities"
                );
            }
        } catch (error) {
            console.log(error);

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
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/dashboard/founder/opportunities"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary"
                >
                    <ArrowLeft size={16} />

                    Back to Opportunities
                </Link>

                <h1 className="text-4xl font-black text-brand-ink">
                    Edit Opportunity
                </h1>

                <p className="mt-2 text-gray-500">
                    Update your opportunity information.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
                className="rounded-3xl bg-white p-8 shadow-sm"
            >
                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block font-medium">
                            Role Title
                        </label>

                        <input
                            {...register(
                                "role_title"
                            )}
                            className="w-full rounded-xl border p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Deadline
                        </label>

                        <input
                            type="date"
                            {...register(
                                "deadline"
                            )}
                            className="w-full rounded-xl border p-3"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="mb-2 block font-medium">
                        Required Skills
                    </label>

                    <input
                        {...register(
                            "required_skills"
                        )}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block font-medium">
                            Work Type
                        </label>

                        <select
                            {...register(
                                "work_type"
                            )}
                            className="w-full rounded-xl border p-3"
                        >
                            <option>
                                Remote
                            </option>

                            <option>
                                Hybrid
                            </option>

                            <option>
                                On Site
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Commitment
                        </label>

                        <select
                            {...register(
                                "commitment_level"
                            )}
                            className="w-full rounded-xl border p-3"
                        >
                            <option>
                                Part Time
                            </option>

                            <option>
                                Full Time
                            </option>

                            <option>
                                Contract
                            </option>
                        </select>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        {...register(
                            "description"
                        )}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        type="submit"
                        disabled={updating}
                        className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white disabled:opacity-50"
                    >
                        {updating
                            ? "Updating..."
                            : "Update Opportunity"}
                    </button>

                    <Link
                        href="/dashboard/founder/opportunities"
                        className="rounded-xl border px-6 py-3"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}