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

const opportunities = [
    {
        id: 1,
        roleTitle: "Frontend Developer",
        startupName: "AI Nexus",
        skills: ["React", "Next.js", "Tailwind"],
        deadline: "15 Aug 2026",
    },
    {
        id: 2,
        roleTitle: "Backend Developer",
        startupName: "FinPilot",
        skills: ["Node.js", "Express", "MongoDB"],
        deadline: "20 Aug 2026",
    },
    {
        id: 3,
        roleTitle: "UI/UX Designer",
        startupName: "HealthSync",
        skills: ["Figma", "Design System"],
        deadline: "12 Aug 2026",
    },
    {
        id: 4,
        roleTitle: "Product Manager",
        startupName: "EduSphere",
        skills: ["Agile", "Roadmap"],
        deadline: "28 Aug 2026",
    },
    {
        id: 5,
        roleTitle: "Marketing Specialist",
        startupName: "GreenVolt",
        skills: ["SEO", "Growth"],
        deadline: "10 Aug 2026",
    },
    {
        id: 6,
        roleTitle: "Full Stack Developer",
        startupName: "MarketFlow",
        skills: ["React", "Node.js", "MongoDB"],
        deadline: "18 Aug 2026",
    },
];

export default function FeaturedOpportunities() {
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
                            key={item.id}
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
                                {item.roleTitle}
                            </h3>

                            {/* Startup */}
                            <div className="mt-4 flex items-center gap-2 text-gray-600">
                                <Building2 size={18} />

                                <span>{item.startupName}</span>
                            </div>

                            {/* Skills */}
                            <div className="mt-6">
                                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#15173D]">
                                    <Code2 size={16} />
                                    Required Skills
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill) => (
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
                                    Deadline: {item.deadline}
                                </span>
                            </div>

                            {/* Button */}
                            <Link
                                href={`/opportunities/${item.id}`}
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