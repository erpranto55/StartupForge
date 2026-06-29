"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
    ArrowRight,
    Building2,
    Users,
    UserCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function FeaturedStartups() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStartups = async () => {
            try {
                const res = await axios.get("/api/startups");
                if (res.data.success) {
                    setStartups(res.data.data.slice(0, 6));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadStartups();
    }, []);

    if (loading) {
        return (
            <section className="bg-[#F1E9E9] py-24">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    Loading featured startups...
                </div>
            </section>
        );
    }

    if (!startups.length) {
        return (
            <section className="bg-[#F1E9E9] py-24">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    No featured startups found.
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F1E9E9] py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">
                            Featured Startups
                        </span>

                        <h2 className="mt-5 text-4xl font-black text-[#15173D] lg:text-5xl">
                            Discover Innovative Startups
                        </h2>

                        <p className="mt-4 max-w-2xl text-gray-600">
                            Explore ambitious startups looking
                            for talented builders, developers,
                            marketers, and collaborators.
                        </p>
                    </div>

                    <Link
                        href="/startups"
                        className="inline-flex items-center gap-2 font-semibold text-brand-primary transition hover:gap-3"
                    >
                        View All Startups

                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {startups.map((startup, index) => (
                        <motion.div
                            key={startup._id}
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
                            className="group rounded-[28px] border border-[#E491C9]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Logo */}
                            {startup.logo ? (
                                <img
                                    src={startup.logo}
                                    alt={startup.startup_name}
                                    className="h-14 w-14 rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                    <Building2
                                        size={28}
                                        className="text-brand-primary"
                                    />
                                </div>
                            )}

                            {/* Startup Name */}
                            <h3 className="mt-6 text-2xl font-bold text-[#15173D]">
                                {startup.startup_name}
                            </h3>

                            {/* Founder */}
                            <div className="mt-5 flex items-center gap-3 text-gray-600">
                                <UserCircle2
                                    size={18}
                                />

                                <span>
                                    {startup.founder_name}
                                </span>
                            </div>

                            {/* Industry */}
                            <div className="mt-3">
                                <span className="rounded-full bg-[#E491C9]/20 px-3 py-1 text-sm font-medium text-brand-primary">
                                    {startup.industry}
                                </span>
                            </div>

                            {/* Team */}
                            <div className="mt-6 flex items-center gap-2 text-gray-600">
                                <Users size={18} />

                                <span>
                                    Team Members: {startup.team_members?.length || 0}
                                </span>
                            </div>

                            {/* Button */}
                            <Link
                                href={`/startups/${startup._id}`}
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