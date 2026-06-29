"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarDays,
    Building2,
    Code2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function FeaturedOpportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOpportunities = async () => {
            try {
                const res = await axios.get("/api/opportunities?page=1&limit=6");
                if (res.data.success) {
                    setOpportunities(res.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadOpportunities();
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-24">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    Loading featured opportunities...
                </div>
            </section>
        );
    }

    if (!opportunities.length) {
        return (
            <section className="bg-white py-24">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    No featured opportunities found.
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">
                            Featured Opportunities
                        </span>

                        <h2 className="mt-5 text-4xl font-black text-[#15173D] lg:text-5xl">
                            Join Exciting Startup Teams
                        </h2>

                        <p className="mt-4 max-w-2xl text-gray-600">
                            Discover startup opportunities and
                            collaborate with founders building
                            innovative products.
                        </p>
                    </div>

                    <Link
                        href="/opportunities"
                        className="inline-flex items-center gap-2 font-semibold text-brand-primary transition hover:gap-3"
                    >
                        View All Opportunities

                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {opportunities.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            className="group flex flex-col rounded-[28px] border border-[#E491C9]/20 bg-[#F8F5F8] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <BriefcaseBusiness
                                    size={28}
                                    className="text-brand-primary"
                                />
                            </div>

                            {/* Role */}
                            <h3 className="mt-6 text-2xl font-bold text-[#15173D]">
                                {item.role_title}
                            </h3>

                            {/* Startup */}
                            <div className="mt-4 flex items-center gap-2 text-gray-600">
                                <Building2 size={18} />

                                <span>{item.startup_name}</span>
                            </div>

                            {/* Skills */}
                            <div className="mt-6">
                                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#15173D]">
                                    <Code2 size={16} />
                                    Required Skills
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {(
                                        Array.isArray(item.required_skills)
                                            ? item.required_skills
                                            : item.required_skills
                                                ?.split(",")
                                                .map(skill => skill.trim()) || []
                                    ).map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-medium text-brand-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="mt-6 flex items-center gap-2 text-gray-600">
                                <CalendarDays size={18} />

                                <span>
                                    Deadline: {new Date(item.deadline).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Button */}
                            <Link
                                href={`/opportunities/${item._id}`}
                                className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-primary transition hover:gap-3"
                            >
                                View Details

                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}