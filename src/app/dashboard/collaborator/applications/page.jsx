"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function MyApplicationsPage() {
    const { user, loading } = useAuth();

    const [applications, setApplications] =
        useState([]);

    const [pageLoading, setPageLoading] =
        useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadApplications =
            async () => {
                try {
                    const res =
                        await axios.get(
                            `/api/applications/user/${user.email}`
                        );

                    if (
                        res.data.success
                    ) {
                        setApplications(
                            res.data.data
                        );
                    }
                } catch (error) {
                    console.log(error);

                    toast.error(
                        "Failed to load applications"
                    );
                } finally {
                    setPageLoading(
                        false
                    );
                }
            };

        loadApplications();
    }, [user]);

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Delete this application?"
            )
        )
            return;

        try {
            const res =
                await axios.delete(
                    `/api/applications/${id}`
                );

            if (res.data.success) {
                setApplications(
                    (prev) =>
                        prev.filter(
                            (app) =>
                                app._id !== id
                        )
                );

                toast.success(
                    "Application deleted"
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                "Delete failed"
            );
        }
    };

    if (loading || pageLoading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                My Applications
            </h1>

            <p className="mt-2 text-gray-500">
                Track the status of your startup applications.
            </p>

            {applications.length === 0 ? (
                <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow">
                    No Applications Found
                </div>
            ) : (
                <div className="mt-10 space-y-5">
                    {applications.map(
                        (
                            application
                        ) => (
                            <div
                                key={
                                    application._id
                                }
                                className="rounded-3xl bg-white p-6 shadow-sm"
                            >
                                <h2 className="text-2xl font-bold">
                                    {
                                        application.role_title
                                    }
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    {
                                        application.startup_name
                                    }
                                </p>

                                <div className="mt-5 flex flex-wrap gap-4">
                                    <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm">
                                        Applied:{" "}
                                        {new Date(
                                            application.applied_at
                                        ).toLocaleDateString()}
                                    </span>

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm ${application.status ===
                                            "Accepted"
                                            ? "bg-green-100 text-green-700"
                                            : application.status ===
                                                "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {
                                            application.status
                                        }
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            application._id
                                        )
                                    }
                                    className="mt-5 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                                >
                                    Delete Application
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}