"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";
import Link from "next/link";

import {
    Search,
    BriefcaseBusiness,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

export default function OpportunitiesPage() {
    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState("");

    const [opportunities, setOpportunities] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `/api/opportunities?page=${page}&search=${search}&workType=${filter}`
                );

                if (res.data.success) {
                    setOpportunities(res.data.data);

                    setTotalPages(
                        res.data.totalPages
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [page, search, filter]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium">
                    Loading opportunities...
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-5xl font-black text-brand-ink">
                    Browse Opportunities
                </h1>

                <p className="mt-4 text-gray-500">
                    Discover startup opportunities and
                    collaborate with ambitious founders.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mt-10 grid gap-4 md:grid-cols-[1fr_220px]">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search role or skills..."
                        className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 shadow-sm"
                    />
                </div>

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                    className="rounded-2xl border border-gray-200 bg-white px-4 shadow-sm"
                >
                    <option value="">All</option>

                    <option value="Remote">
                        Remote
                    </option>

                    <option value="Hybrid">
                        Hybrid
                    </option>

                    <option value="On Site">
                        On Site
                    </option>
                </select>
            </div>

            {opportunities.length === 0 && (
                <div className="mt-16 rounded-3xl bg-white p-12 text-center shadow">
                    <h2 className="text-2xl font-bold">
                        No Opportunities Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try another search or filter.
                    </p>
                </div>
            )}


            {opportunities.length > 0 && (
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {opportunities.map((opportunity) => (
                        <div
                            key={opportunity._id}
                            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <BriefcaseBusiness className="text-brand-primary" />
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-brand-ink">
                                {opportunity.role_title}
                            </h2>

                            <p className="mt-2 text-gray-500">
                                {opportunity.startup_name}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {(
                                    Array.isArray(opportunity.required_skills)
                                        ? opportunity.required_skills
                                        : opportunity.required_skills
                                            ?.split(",")
                                            .map((skill) => skill.trim()) || []
                                ).map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 flex items-center gap-2 text-gray-500">
                                <CalendarDays size={16} />
                                <span>
                                    Deadline:{" "}
                                    {new Date(
                                        opportunity.deadline
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="mt-4">
                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                    {opportunity.work_type}
                                </span>
                            </div>

                            <Link
                                href={`/opportunities/${opportunity._id}`}
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary"
                            >
                                View Details
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}


            <div className="mt-12 flex justify-center gap-3">
                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="flex items-center px-4">
                    {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage(page + 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}