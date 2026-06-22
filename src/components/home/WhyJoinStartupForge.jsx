"use client";

import { motion } from "motion/react";

import {
    Rocket,
    Users,
    BriefcaseBusiness,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        title: "Build Startup Teams",
        description:
            "Connect with talented developers, designers, and marketers to transform your startup vision into reality.",
        icon: Users,
    },
    {
        title: "Discover Opportunities",
        description:
            "Explore exciting startup roles and collaborate on innovative products with ambitious founders.",
        icon: BriefcaseBusiness,
    },
    {
        title: "Launch Faster",
        description:
            "Reduce hiring friction and find the right collaborators to accelerate startup growth.",
        icon: Rocket,
    },
    {
        title: "Grow Your Network",
        description:
            "Meet founders, builders, and professionals from diverse industries around the globe.",
        icon: TrendingUp,
    },
];

export default function WhyJoinStartupForge() {
    return (
        <section className="bg-[#15173D] py-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-brand-primary/20 px-4 py-2 text-sm font-semibold text-[#E491C9]">
                        Why StartupForge
                    </span>

                    <h2 className="mt-5 text-4xl font-black lg:text-5xl">
                        Everything You Need To
                        <span className="block text-[#E491C9]">
                            Build The Next Big Thing
                        </span>
                    </h2>

                    <p className="mt-5 text-lg text-white/70">
                        Whether you&apos;re a founder searching for
                        collaborators or a builder seeking exciting
                        startup opportunities, StartupForge helps
                        you connect, collaborate, and grow.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
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
                            className="group rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E491C9]/40 hover:bg-white/10"
                        >
                            {/* Icon */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/20">
                                <feature.icon
                                    size={28}
                                    className="text-[#E491C9]"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-xl font-bold">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-4 leading-7 text-white/65">
                                {feature.description}
                            </p>

                            {/* Learn More */}
                            <button className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E491C9] transition hover:gap-3">
                                Learn More

                                <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}