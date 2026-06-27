"use client";

import { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    Clock3,
    CheckCircle,
    XCircle,
} from "lucide-react";
import axios from "@/lib/axios";
import useCustomUser from "@/hooks/useCustomUser";
import StatsCard from "@/components/dashboard/StatsCard";
import SkeletonCard from "@/components/dashboard/SkeletonCard";

export default function CollaboratorDashboard() {
    const { customUser, loading: userLoading } = useCustomUser();

    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        if (!customUser?.email) return;

        const loadStats = async () => {
            try {
                const res = await axios.get(
                    `/api/applications/user/${customUser.email}`
                );

                if (res.data.success) {
                    const applications = res.data.data ?? [];
                    setStats({
                        total: applications.length,
                        pending: applications.filter(
                            (a) => a.status === "Pending"
                        ).length,
                        accepted: applications.filter(
                            (a) => a.status === "Accepted"
                        ).length,
                        rejected: applications.filter(
                            (a) => a.status === "Rejected"
                        ).length,
                    });
                }
            } catch (error) {
                console.error("Collaborator stats error:", error);
            } finally {
                setStatsLoading(false);
            }
        };

        loadStats();
    }, [customUser]);

    const isLoading = userLoading || statsLoading;

    return (
        <div className="space-y-8">
            {/* ── Page header ── */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-brand-ink">
                    Collaborator Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Track your applications and explore new startup opportunities.
                </p>
            </div>

            {/* ── Stats grid ── */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <StatsCard
                            icon={BriefcaseBusiness}
                            value={stats?.total ?? 0}
                            label="Total Applications"
                            color="purple"
                            delay={0}
                        />
                        <StatsCard
                            icon={Clock3}
                            value={stats?.pending ?? 0}
                            label="Pending Review"
                            color="yellow"
                            delay={0.08}
                        />
                        <StatsCard
                            icon={CheckCircle}
                            value={stats?.accepted ?? 0}
                            label="Accepted"
                            color="green"
                            delay={0.16}
                        />
                        <StatsCard
                            icon={XCircle}
                            value={stats?.rejected ?? 0}
                            label="Rejected"
                            color="red"
                            delay={0.24}
                        />
                    </>
                )}
            </div>

            {/* ── Quick-action cards ── */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-brand-ink">
                    Quick Actions
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                    {[
                        {
                            label: "Browse Opportunities",
                            href: "/opportunities",
                            color: "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white",
                        },
                        {
                            label: "View My Applications",
                            href: "/dashboard/collaborator/applications",
                            color: "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white",
                        },
                    ].map((action) => (
                        <a
                            key={action.href}
                            href={action.href}
                            className={`flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${action.color}`}
                        >
                            {action.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}