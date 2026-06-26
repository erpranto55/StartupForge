"use client";

import { useEffect, useState } from "react";

import {
    BriefcaseBusiness,
    Clock3,
    CheckCircle,
} from "lucide-react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function CollaboratorDashboard() {
    const { user, loading } = useAuth();

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
    });

    const [pageLoading, setPageLoading] =
        useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadStats = async () => {
            try {
                const res = await axios.get(
                    `/api/applications/user/${user.email}`
                );

                if (res.data.success) {
                    const applications =
                        res.data.data;

                    setStats({
                        total:
                            applications.length,

                        pending:
                            applications.filter(
                                (app) =>
                                    app.status ===
                                    "Pending"
                            ).length,

                        accepted:
                            applications.filter(
                                (app) =>
                                    app.status ===
                                    "Accepted"
                            ).length,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setPageLoading(false);
            }
        };

        loadStats();
    }, [user]);

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
                Collaborator Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Track your applications and startup opportunities.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BriefcaseBusiness className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        {stats.total}
                    </h3>

                    <p>Total Applications</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Clock3 className="text-yellow-500" />

                    <h3 className="mt-4 text-3xl font-bold">
                        {stats.pending}
                    </h3>

                    <p>Pending Reviews</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <CheckCircle className="text-green-600" />

                    <h3 className="mt-4 text-3xl font-bold">
                        {stats.accepted}
                    </h3>

                    <p>Accepted Applications</p>
                </div>
            </div>
        </div>
    );
}