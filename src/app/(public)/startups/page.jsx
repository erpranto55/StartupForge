"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Rocket,
    Users,
    ArrowRight,
} from "lucide-react";

const startupsData = [
    {
        id: 1,
        startupName: "AI Nexus",
        founderName: "John Doe",
        industry: "Artificial Intelligence",
        teamSize: 5,
    },
    {
        id: 2,
        startupName: "FinPilot",
        founderName: "Sarah Smith",
        industry: "FinTech",
        teamSize: 3,
    },
    {
        id: 3,
        startupName: "HealthSync",
        founderName: "Alex Johnson",
        industry: "HealthTech",
        teamSize: 8,
    },
    {
        id: 4,
        startupName: "EduSphere",
        founderName: "Emma Wilson",
        industry: "EdTech",
        teamSize: 4,
    },
];

export default function BrowseStartupsPage() {
    const [search, setSearch] = useState("");

    const filtered = startupsData.filter(
        (startup) =>
            startup.startupName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            startup.industry
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-5xl font-black text-brand-ink">
                    Browse Startups
                </h1>

                <p className="mt-4 text-gray-500">
                    Discover innovative startups and
                    connect with ambitious founders.
                </p>
            </div>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-2xl">
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
                        placeholder="Search startups..."
                        className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 shadow-sm"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((startup) => (
                    <div
                        key={startup.id}
                        className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                            <Rocket
                                className="text-brand-primary"
                            />
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-brand-ink">
                            {startup.startupName}
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Founder:{" "}
                            {startup.founderName}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary">
                                {startup.industry}
                            </span>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-gray-500">
                            <Users size={16} />
                            Team Needed:
                            {startup.teamSize}
                        </div>

                        <Link
                            href={`/startups/${startup.id}`}
                            className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary"
                        >
                            View Details
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}