"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";

import {
    Search,
    Rocket,
    Users,
    ArrowRight,
} from "lucide-react";

export default function BrowseStartupsPage() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadStartups = async () => {
            try {
                const res = await axios.get("/api/startups");

                if (res.data.success) {
                    setStartups(res.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadStartups();
    }, []);

    const filtered = useMemo(() => {
        return startups.filter((startup) => {
            const keyword = search.toLowerCase();

            return (
                startup.startup_name
                    ?.toLowerCase()
                    .includes(keyword) ||
                startup.industry
                    ?.toLowerCase()
                    .includes(keyword)
            );
        });
    }, [search, startups]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center text-xl font-semibold">
                    Loading startups...
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">

            {/* Header */}

            <div className="text-center">
                <h1 className="text-5xl font-black text-brand-ink">
                    Browse Startups
                </h1>

                <p className="mt-4 text-gray-500">
                    Discover innovative startups and connect with ambitious founders.
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
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search startups..."
                        className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 shadow-sm"
                    />
                </div>
            </div>

            {/* Empty */}

            {!filtered.length && (
                <div className="mt-16 text-center text-gray-500">
                    No startups found.
                </div>
            )}

            {/* Cards */}

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((startup) => (
                    <div
                        key={startup._id}
                        className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                    >
                        {startup.logo ? (
                            <Image
                                src={startup.logo}
                                alt={startup.startup_name}
                                width={72}
                                height={72}
                                className="h-16 w-16 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <Rocket className="text-brand-primary" />
                            </div>
                        )}

                        <h2 className="mt-5 text-2xl font-bold text-brand-ink">
                            {startup.startup_name}
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Founder: {startup.founder_name}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary">
                                {startup.industry}
                            </span>

                            {startup.funding_stage && (
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                    {startup.funding_stage}
                                </span>
                            )}
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-gray-500">
                            <Users size={16} />
                            Team Members:{" "}
                            {startup.team_members?.length || 0}
                        </div>

                        <Link
                            href={`/startups/${startup._id}`}
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