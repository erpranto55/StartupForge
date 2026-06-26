"use client";

import { useEffect, useState } from "react";

import {
    BriefcaseBusiness,
    Users,
    CheckCircle,
} from "lucide-react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function FounderDashboard() {
    const { user, loading } = useAuth();

    const [stats, setStats] = useState({
        totalOpportunities: 0,
        totalApplications: 0,
        acceptedMembers: 0,
    });

    const [pageLoading, setPageLoading] =
        useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadDashboard = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/dashboard/${user.email}`
                );

                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setPageLoading(false);
            }
        };

        loadDashboard();
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
                Founder Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Manage your startup and opportunities.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BriefcaseBusiness className="text-brand-primary" />

                    <h2 className="mt-4 text-3xl font-bold">
                        {stats.totalOpportunities}
                    </h2>

                    <p className="text-gray-500">
                        Opportunities
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Users className="text-blue-500" />

                    <h2 className="mt-4 text-3xl font-bold">
                        {stats.totalApplications}
                    </h2>

                    <p className="text-gray-500">
                        Applications
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <CheckCircle className="text-green-600" />

                    <h2 className="mt-4 text-3xl font-bold">
                        {stats.acceptedMembers}
                    </h2>

                    <p className="text-gray-500">
                        Accepted Members
                    </p>
                </div>
            </div>
        </div>
    );
}