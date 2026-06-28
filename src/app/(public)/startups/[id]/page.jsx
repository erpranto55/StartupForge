"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";

import {
    ArrowLeft,
    Rocket,
    Users,
    Globe,
    BriefcaseBusiness,
    ArrowRight,
} from "lucide-react";

export default function StartupDetailsPage() {
    const { id } = useParams();

    const [startup, setStartup] = useState(null);
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const loadStartup = async () => {
            try {
                const res = await axios.get(`/api/startups/${id}`);

                if (res.data.success) {
                    setStartup(res.data.data.startup);
                    setOpportunities(res.data.data.opportunities);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadStartup();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                Loading Startup...
            </div>
        );
    }

    if (!startup) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                Startup not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back */}

            <Link
                href="/startups"
                className="inline-flex items-center gap-2 text-brand-primary"
            >
                <ArrowLeft size={18} />
                Back to Startups
            </Link>

            {/* Banner */}

            <div className="mt-6 rounded-3xl bg-[#15173D] p-10 text-white">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                        {startup.logo ? (
                            <Image
                                src={startup.logo}
                                alt={startup.startup_name}
                                width={90}
                                height={90}
                                className="rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                                <Rocket size={34} />
                            </div>
                        )}

                        <div>
                            <h1 className="text-5xl font-black">
                                {startup.startup_name}
                            </h1>

                            <p className="mt-3 text-white/70">
                                Founded by {startup.founder_name}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/10 px-4 py-2">
                            {startup.industry}
                        </span>

                        {startup.funding_stage && (
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                {startup.funding_stage}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Body */}

            <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">

                {/* About */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        About Startup
                    </h2>

                    <p className="mt-5 leading-8 text-gray-600">
                        {startup.description}
                    </p>
                </div>

                {/* Sidebar */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Startup Info
                    </h2>

                    <div className="mt-6 space-y-5">

                        <div>
                            <p className="text-sm text-gray-500">
                                Industry
                            </p>

                            <p className="font-semibold">
                                {startup.industry}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Funding Stage
                            </p>

                            <p className="font-semibold">
                                {startup.funding_stage || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Team Members
                            </p>

                            <div className="flex items-center gap-2 font-semibold">
                                <Users size={16} />
                                {startup.team_members?.length || 0}
                            </div>
                        </div>

                        {startup.website && (
                            <div>
                                <p className="text-sm text-gray-500">
                                    Website
                                </p>

                                <a
                                    href={startup.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-2 text-brand-primary"
                                >
                                    <Globe size={16} />
                                    Visit Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Opportunities */}

            <div className="mt-12">
                <h2 className="text-3xl font-black text-brand-ink">
                    Open Opportunities
                </h2>

                {opportunities.length === 0 ? (
                    <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm">
                        No opportunities available.
                    </div>
                ) : (
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {opportunities.map((opportunity) => (
                            <div
                                key={opportunity._id}
                                className="rounded-3xl bg-white p-6 shadow-sm"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                                    <BriefcaseBusiness className="text-brand-primary" />
                                </div>

                                <h3 className="mt-4 text-xl font-bold">
                                    {opportunity.role_title}
                                </h3>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {opportunity.required_skills?.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/opportunities/${opportunity._id}`}
                                    className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary"
                                >
                                    View Opportunity
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}