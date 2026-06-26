"use client";

import { useEffect, useState } from "react";

import {
    CheckCircle,
    XCircle,
    Globe,
    Mail,
} from "lucide-react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function ApplicationsPage() {
    const { user, loading } = useAuth();

    const [applications, setApplications] = useState([]);

    const [pageLoading, setPageLoading] =
        useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadData = async () => {
            try {
                const res = await axios.get(
                    `/api/applications/founder/${user.email}`
                );

                if (res.data.success) {
                    setApplications(res.data.data);
                }
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load applications"
                );
            } finally {
                setPageLoading(false);
            }
        };

        loadData();
    }, [user]);

    const updateStatus = async (
        id,
        status
    ) => {
        try {
            const res = await axios.patch(
                `/api/applications/${id}`,
                {
                    status,
                }
            );

            if (res.data.success) {
                setApplications((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? {
                                ...item,
                                status,
                            }
                            : item
                    )
                );

                toast.success(
                    `Application ${status}`
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to update application"
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
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Applications
                </h1>

                <p className="mt-2 text-gray-500">
                    Review applicants for your
                    startup opportunities.
                </p>
            </div>

            {/* Cards */}
            <div className="mt-10 space-y-6">
                {applications.map(
                    (application) => (
                        <div
                            key={application._id}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-brand-ink">
                                        {
                                            application.applicant_name
                                        }
                                    </h2>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail
                                                size={
                                                    16
                                                }
                                            />

                                            {
                                                application.applicant_email
                                            }
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Globe
                                                size={
                                                    16
                                                }
                                            />

                                            <a
                                                href={
                                                    application.portfolio
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-brand-primary"
                                            >
                                                View
                                                Portfolio
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-semibold text-brand-ink">
                                            Applied
                                            For
                                        </p>

                                        <p className="text-gray-600">
                                            {
                                                application.role_title
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-semibold text-brand-ink">
                                            Motivation
                                        </p>

                                        <p className="mt-2 text-gray-600">
                                            {
                                                application.motivation
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary">
                                            {application.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {application.status === "Pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        application._id,
                                                        "Accepted"
                                                    )
                                                }
                                                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                                            >
                                                <CheckCircle size={18} />
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        application._id,
                                                        "Rejected"
                                                    )
                                                }
                                                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                                            >
                                                <XCircle size={18} />
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {application.status === "Accepted" && (
                                        <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 px-5 py-3 font-semibold text-green-700">
                                            <CheckCircle size={18} />
                                            Accepted
                                        </div>
                                    )}

                                    {application.status === "Rejected" && (
                                        <div className="flex items-center justify-center gap-2 rounded-xl bg-red-100 px-5 py-3 font-semibold text-red-700">
                                            <XCircle size={18} />
                                            Rejected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}