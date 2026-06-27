"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import axios from "@/lib/axios";

import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    CalendarDays,
    Clock3,
    Globe,
    BriefcaseBusiness,
} from "lucide-react";

export default function OpportunityDetailsPage() {
    const { id } = useParams();

    const [opportunity, setOpportunity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOpportunity = async () => {
            try {
                const res = await axios.get(
                    `/api/opportunities/${id}`
                );

                if (res.data.success) {
                    setOpportunity(res.data.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadOpportunity();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!opportunity) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                Opportunity not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 text-brand-primary"
            >
                <ArrowLeft size={18} />
                Back to Opportunities
            </Link>

            <div className="mt-6 rounded-3xl bg-[#15173D] p-10 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                    <BriefcaseBusiness size={30} />
                </div>

                <h1 className="mt-6 text-5xl font-black">
                    {opportunity.role_title}
                </h1>

                <p className="mt-3 text-white/70">
                    {opportunity.startup_name}
                </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
                {/* Left */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Role Description
                    </h2>

                    <p className="mt-5 leading-8 text-gray-600">
                        {opportunity.description ||
                            "No description provided."}
                    </p>

                    <h2 className="mt-10 text-2xl font-bold text-brand-ink">
                        Required Skills
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {(
                            Array.isArray(opportunity.required_skills)
                                ? opportunity.required_skills
                                : opportunity.required_skills
                                    ?.split(",")
                                    .map(skill => skill.trim())
                        ).map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-brand-primary/10 px-4 py-2 text-brand-primary"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right */}

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Opportunity Info
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div className="flex items-center gap-3">
                            <Building2 size={18} />

                            <span>
                                {opportunity.startup_name}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Globe size={18} />

                            <span>
                                {opportunity.work_type}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock3 size={18} />

                            <span>
                                {
                                    opportunity.commitment_level
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <CalendarDays size={18} />

                            <span>
                                Deadline:{" "}
                                {new Date(
                                    opportunity.deadline
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/opportunities/${opportunity._id}/apply`}
                        className="mt-8 flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}