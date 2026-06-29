"use client";

import { useEffect, useState } from "react";
import { Users, Rocket, BriefcaseBusiness, DollarSign } from "lucide-react";
import axios from "@/lib/axios";
import StatsCard from "@/components/dashboard/StatsCard";
import SkeletonCard from "@/components/dashboard/SkeletonCard";
import AdminPieChart from "@/components/dashboard/AdminPieChart";
import StartupStatusChart from "@/components/dashboard/StartupStatusChart";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const res = await axios.get("/api/dashboard/admin");

                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const formatRevenue = (amount) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <div className="space-y-8">
            {/* ── Page header ── */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-brand-ink">
                    Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Platform-wide metrics and management overview.
                </p>
            </div>

            {/* ── Stats grid ── */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {loading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <StatsCard
                            icon={Users}
                            value={stats?.users ?? 0}
                            label="Total Users"
                            color="purple"
                            delay={0}
                        />
                        <StatsCard
                            icon={Rocket}
                            value={stats?.startups ?? 0}
                            label="Total Startups"
                            color="blue"
                            delay={0.08}
                        />
                        <StatsCard
                            icon={BriefcaseBusiness}
                            value={stats?.startups ?? 0}
                            label="Total Opportunities"
                            color="orange"
                            delay={0.16}
                        />
                        <StatsCard
                            icon={DollarSign}
                            value={stats?.payments ?? 0}
                            label="Total Payments"
                            color="green"
                            delay={0.24}
                        />
                    </>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <AdminPieChart stats={stats} />

                <StartupStatusChart stats={stats} />
            </div>

            {/* ── Quick-action cards ── */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-brand-ink">
                    Admin Quick Actions
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        {
                            label: "Manage Users",
                            href: "/dashboard/admin/users",
                            color: "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white",
                        },
                        {
                            label: "Manage Startups",
                            href: "/dashboard/admin/startups",
                            color: "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white",
                        },
                        {
                            label: "View Transactions",
                            href: "/dashboard/admin/transactions",
                            color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white",
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