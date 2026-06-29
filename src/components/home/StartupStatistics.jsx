"use client";

import { motion } from "motion/react";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";

import {
    Rocket,
    Users,
    BriefcaseBusiness,
    TrendingUp,
} from "lucide-react";

export default function StartupStatistics() {
    const [counts, setCounts] = useState({ startups: 0, opportunities: 0, collaborators: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/public-stats")
            .then(res => {
                if (res.data.success) {
                    setCounts(res.data.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const stats = [
        {
            title: "Active Startups",
            value: loading ? "..." : `${counts.startups}`,
            icon: Rocket,
        },
        {
            title: "Collaborators",
            value: loading ? "..." : `${counts.collaborators}`,
            icon: Users,
        },
        {
            title: "Opportunities",
            value: loading ? "..." : `${counts.opportunities}`,
            icon: BriefcaseBusiness,
        },
        {
            title: "Success Rate",
            value: "95%",
            icon: TrendingUp,
        },
    ];
    return (
        <section className="bg-[#F1E9E9] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">
                        Platform Growth
                    </span>

                    <h2 className="mt-4 text-4xl font-black text-[#15173D]">
                        Empowering Startup Innovation
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Thousands of founders and collaborators
                        are already building the future together.
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
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
                            className="group rounded-3xl border border-[#E491C9]/20 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <stat.icon
                                    size={28}
                                    className="text-brand-primary"
                                />
                            </div>

                            <h3 className="mt-6 text-4xl font-black text-[#15173D]">
                                {stat.value}
                            </h3>

                            <p className="mt-2 font-medium text-gray-500">
                                {stat.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}