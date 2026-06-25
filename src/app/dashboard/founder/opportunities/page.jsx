"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    BriefcaseBusiness,
    PlusCircle,
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

import useAuth from "@/hooks/useAuth";
import axios from "@/lib/axios";

export default function OpportunitiesPage() {
    const { user, loading } = useAuth();

    const [opportunities, setOpportunities] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadData = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/founder/${user.email}`
                );

                if (res.data.success) {
                    setOpportunities(res.data.data);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load opportunities");
            } finally {
                setPageLoading(false);
            }
        };

        loadData();
    }, [user]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this opportunity?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/opportunities/${id}`);

            setOpportunities((prev) =>
                prev.filter((item) => item._id !== id)
            );

            toast.success("Opportunity deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Delete failed");
        }
    };

    if (loading || pageLoading) {
        return (
            <div className="py-20 text-center text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-brand-ink">
                        Manage Opportunities
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create and manage your startup opportunities.
                    </p>
                </div>

                <Link
                    href="/dashboard/founder/opportunities/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                >
                    <PlusCircle size={18} />
                    Add Opportunity
                </Link>
            </div>

            {/* Empty State */}
            {opportunities.length === 0 ? (
                <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
                            <BriefcaseBusiness
                                size={40}
                                className="text-brand-primary"
                            />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-brand-ink">
                            No Opportunities Found
                        </h2>

                        <p className="mt-3 max-w-md text-gray-500">
                            You haven't created any opportunities yet.
                        </p>

                        <Link
                            href="/dashboard/founder/opportunities/create"
                            className="mt-6 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                        >
                            Create Your First Opportunity
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {opportunities.map((item) => (
                        <div
                            key={item._id}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                                        <BriefcaseBusiness
                                            size={24}
                                            className="text-brand-primary"
                                        />
                                    </div>

                                    <h2 className="mt-4 text-2xl font-bold text-brand-ink">
                                        {item.role_title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {item.work_type}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/dashboard/founder/opportunities/edit/${item._id}`}
                                        className="rounded-lg border p-2 hover:bg-gray-50"
                                    >
                                        <Pencil size={18} />
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(item._id)
                                        }
                                        className="rounded-lg border p-2 text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {item.required_skills?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 border-t pt-4 text-sm text-gray-500">
                                Deadline:{" "}
                                {new Date(
                                    item.deadline
                                ).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}