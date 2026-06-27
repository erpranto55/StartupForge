"use client";

import { useEffect, useState } from "react";
import { Users, Rocket, BriefcaseBusiness, DollarSign } from "lucide-react";
import axios from "@/lib/axios";
import StatsCard from "@/components/dashboard/StatsCard";
import SkeletonCard from "@/components/dashboard/SkeletonCard";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Fetch counts from existing endpoints in parallel
                const [usersRes, startupsRes, opportunitiesRes, paymentsRes] =
                    await Promise.allSettled([
                        axios.get("/api/users"),
                        axios.get("/api/startups"),
                        axios.get("/api/opportunities"),
                        axios.get("/api/payments"),
                    ]);

                const users =
                    usersRes.status === "fulfilled"
                        ? usersRes.value.data
                        : [];
                const startups =
                    startupsRes.status === "fulfilled"
                        ? startupsRes.value.data
                        : [];
                const opportunities =
                    opportunitiesRes.status === "fulfilled"
                        ? opportunitiesRes.value.data
                        : [];
                const payments =
                    paymentsRes.status === "fulfilled"
                        ? paymentsRes.value.data
                        : [];

                // Total revenue: sum all payment amounts
                const rawPayments = Array.isArray(payments)
                    ? payments
                    : payments?.data ?? [];

                const totalRevenue = rawPayments.reduce(
                    (sum, p) => sum + (p.amount ?? p.price ?? 0),
                    0
                );

                setStats({
                    totalUsers: Array.isArray(users)
                        ? users.length
                        : users?.data?.length ?? 0,
                    totalStartups: Array.isArray(startups)
                        ? startups.length
                        : startups?.data?.length ?? 0,
                    totalOpportunities: Array.isArray(opportunities)
                        ? opportunities.length
                        : opportunities?.data?.length ?? 0,
                    totalRevenue,
                });
            } catch (error) {
                console.error("Admin stats error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
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
                            value={stats?.totalUsers ?? 0}
                            label="Total Users"
                            color="purple"
                            delay={0}
                        />
                        <StatsCard
                            icon={Rocket}
                            value={stats?.totalStartups ?? 0}
                            label="Total Startups"
                            color="blue"
                            delay={0.08}
                        />
                        <StatsCard
                            icon={BriefcaseBusiness}
                            value={stats?.totalOpportunities ?? 0}
                            label="Total Opportunities"
                            color="orange"
                            delay={0.16}
                        />
                        <StatsCard
                            icon={DollarSign}
                            value={formatRevenue(stats?.totalRevenue ?? 0)}
                            label="Total Revenue"
                            color="green"
                            delay={0.24}
                        />
                    </>
                )}
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