"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle,
    Trash2,
    Rocket,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import Image from "next/image";

export default function ManageStartupsPage() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    // ----------------------------
    // Load Startups
    // ----------------------------
    useEffect(() => {
        loadStartups();
    }, []);

    const loadStartups = async () => {
        try {
            setLoading(true);

            const res = await axios.get("/api/startups");

            if (res.data.success) {
                setStartups(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load startups");
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------
    // Approve Startup
    // ----------------------------
    const handleApprove = async (id) => {
        try {
            const res = await axios.patch(
                `/api/startups/approve/${id}`
            );

            if (res.data.success) {
                toast.success("Startup Approved");

                setStartups((prev) =>
                    prev.map((startup) =>
                        startup._id === id
                            ? {
                                ...startup,
                                status: "approved",
                            }
                            : startup
                    )
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Approval failed");
        }
    };

    // ----------------------------
    // Delete Startup
    // ----------------------------
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this startup?"
        );

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(
                `/api/startups/${id}`
            );

            if (res.data.success) {
                toast.success("Startup Deleted");

                setStartups((prev) =>
                    prev.filter(
                        (startup) =>
                            startup._id !== id
                    )
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Manage Startups
                </h1>

                <p className="mt-2 text-gray-500">
                    Review, approve and remove startup
                    profiles.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="mt-10 text-center text-lg">
                    Loading startups...
                </div>
            )}

            {/* Empty */}
            {!loading && startups.length === 0 && (
                <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">
                        No Startups Found
                    </h2>
                </div>
            )}

            {/* Cards */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {startups.map((startup) => (
                    <div
                        key={startup._id}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start gap-5">
                            {/* Logo */}
                            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-brand-primary/10">
                                {startup.logo ? (
                                    <Image
                                        src={startup.logo}
                                        alt={startup.startup_name}
                                        width={100}
                                        height={100}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Rocket className="text-brand-primary" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-brand-ink">
                                    {startup.startup_name}
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Founder:
                                    {" "}
                                    {startup.founder_email}
                                </p>

                                <p className="text-gray-500">
                                    Industry:
                                    {" "}
                                    {startup.industry}
                                </p>

                                <p className="text-gray-500">
                                    Funding:
                                    {" "}
                                    {startup.funding_stage}
                                </p>

                                <div className="mt-4">
                                    {startup.status ===
                                        "approved" ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            {startup.status !==
                                "approved" && (
                                    <button
                                        onClick={() =>
                                            handleApprove(
                                                startup._id
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                                    >
                                        <CheckCircle size={18} />
                                        Approve
                                    </button>
                                )}

                            <button
                                onClick={() =>
                                    handleDelete(
                                        startup._id
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                            >
                                <Trash2 size={18} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}