"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Users, CheckCircle } from "lucide-react";
import axios from "@/lib/axios";
import useCustomUser from "@/hooks/useCustomUser";
import StatsCard from "@/components/dashboard/StatsCard";
import SkeletonCard from "@/components/dashboard/SkeletonCard";
import FounderAnalyticsChart from "@/components/dashboard/FounderAnalyticsChart";
import Link from "next/link";

export default function FounderDashboard() {
    const { customUser, loading: userLoading } = useCustomUser();

    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        if (!customUser?.email) return;

        const loadDashboard = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/dashboard/${customUser.email}`
                );
                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (error) {
                console.error(error);

                toast.error("Failed to load dashboard statistics.");
            } finally {
                setStatsLoading(false);
            }
        };

        loadDashboard();
    }, [customUser]);

    const isLoading = userLoading || statsLoading;

    return (
        <div className="space-y-8">
            {/* ── Page header ── */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-brand-ink">
                    Founder Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    An overview of your startup, opportunities, and team.
                </p>
            </div>

            {/* ── Stats grid ── */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <StatsCard
                            icon={BriefcaseBusiness}
                            value={stats?.totalOpportunities ?? 0}
                            label="Total Opportunities"
                            color="purple"
                            delay={0}
                        />
                        <StatsCard
                            icon={Users}
                            value={stats?.totalApplications ?? 0}
                            label="Total Applications"
                            color="blue"
                            delay={0.08}
                        />
                        <StatsCard
                            icon={CheckCircle}
                            value={stats?.acceptedMembers ?? 0}
                            label="Accepted Members"
                            color="green"
                            delay={0.16}
                        />
                    </>
                )}
            </div>

            <FounderAnalyticsChart stats={stats} />

            {/* ── Quick-action cards ── */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-brand-ink">
                    Quick Actions
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            label: "Post an Opportunity",
                            href: "/dashboard/founder/opportunities",
                            color: "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white",
                        },
                        {
                            label: "View Applications",
                            href: "/dashboard/founder/applications",
                            color: "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white",
                        },
                        {
                            label: "Manage My Startup",
                            href: "/dashboard/founder/startup",
                            color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white",
                        },
                    ].map((action) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className={`flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${action.color}`}
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}