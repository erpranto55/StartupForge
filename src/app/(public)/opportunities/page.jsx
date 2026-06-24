"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
    Search,
    BriefcaseBusiness,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

const opportunities = [
    {
        id: 1,
        roleTitle: "Frontend Developer",
        startupName: "AI Nexus",
        requiredSkills: ["React", "Next.js", "Tailwind"],
        workType: "Remote",
        deadline: "2026-08-15",
    },
    {
        id: 2,
        roleTitle: "Backend Developer",
        startupName: "FinPilot",
        requiredSkills: ["Node.js", "Express", "MongoDB"],
        workType: "Hybrid",
        deadline: "2026-08-20",
    },
    {
        id: 3,
        roleTitle: "UI/UX Designer",
        startupName: "HealthSync",
        requiredSkills: ["Figma", "Design System"],
        workType: "Remote",
        deadline: "2026-08-25",
    },
    {
        id: 4,
        roleTitle: "Product Manager",
        startupName: "EduSphere",
        requiredSkills: ["Agile", "Roadmap"],
        workType: "On Site",
        deadline: "2026-08-30",
    },
];

export default function OpportunitiesPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredOpportunities = useMemo(() => {
        return opportunities.filter((opportunity) => {
            const matchesSearch =
                opportunity.roleTitle
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                opportunity.requiredSkills
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All"
                    ? true
                    : opportunity.workType === filter;

            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);

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
                    <option>All</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On Site</option>
                </select>
            </div>

            {/* Grid */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredOpportunities.map(
                    (opportunity) => (
                        <div
                            key={opportunity.id}
                            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <BriefcaseBusiness className="text-brand-primary" />
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-brand-ink">
                                {
                                    opportunity.roleTitle
                                }
                            </h2>

                            <p className="mt-2 text-gray-500">
                                {
                                    opportunity.startupName
                                }
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {opportunity.requiredSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>

                            <div className="mt-5 flex items-center gap-2 text-gray-500">
                                <CalendarDays size={16} />
                                Deadline:
                                {opportunity.deadline}
                            </div>

                            <div className="mt-4">
                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                    {
                                        opportunity.workType
                                    }
                                </span>
                            </div>

                            <Link
                                href={`/opportunities/${opportunity.id}`}
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary"
                            >
                                View Details
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}