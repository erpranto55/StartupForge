"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
    ArrowRight,
    BriefcaseBusiness,
    Rocket,
    Users,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#15173D] text-white">
            {/* Background Blur */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-brand-primary/30 blur-[140px]" />

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E491C9]/20 blur-[140px]" />

            <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
                        >
                            <Sparkles
                                size={16}
                                className="text-[#E491C9]"
                            />

                            <span className="text-sm font-medium text-white/80">
                                Build Startup Teams Faster
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="mt-6 text-5xl font-black leading-tight lg:text-7xl"
                        >
                            Connect Founders
                            <span className="block bg-linear-to-r from-[#E491C9] to-white bg-clip-text text-transparent">
                                With Talented Builders
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1,
                            }}
                            className="mt-6 max-w-xl text-lg leading-8 text-white/70"
                        >
                            StartupForge helps founders discover developers,
                            designers, marketers, and collaborators to transform
                            innovative ideas into successful startups.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.9,
                                delay: 0.2,
                            }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-primary px-6 font-semibold text-white transition hover:bg-[#851f85]"
                            >
                                Get Started

                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/startups"
                                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-semibold transition hover:bg-white/5"
                            >
                                Explore Startups
                            </Link>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.4,
                            }}
                            className="mt-10 flex flex-wrap gap-5 text-sm text-white/70"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={18}
                                    className="text-[#E491C9]"
                                />
                                Verified Founders
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={18}
                                    className="text-[#E491C9]"
                                />
                                Startup Opportunities
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={18}
                                    className="text-[#E491C9]"
                                />
                                Global Community
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-3xl font-black">
                                    500+
                                </h3>

                                <p className="mt-1 text-sm text-white/60">
                                    Startups
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black">
                                    2K+
                                </h3>

                                <p className="mt-1 text-sm text-white/60">
                                    Collaborators
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black">
                                    1K+
                                </h3>

                                <p className="mt-1 text-sm text-white/60">
                                    Opportunities
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative mx-auto w-full max-w-lg"
                    >
                        {/* Floating Card */}
                        <div className="rounded-4xl border border-white/10 bg-white/95 p-8 text-[#15173D] shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                    <Rocket className="text-brand-primary" />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        AI Startup
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Hiring Team Members
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-4">
                                    <span>Frontend Developer</span>

                                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                                        React
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-4">
                                    <span>Backend Developer</span>

                                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                                        Node.js
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-4">
                                    <span>UI/UX Designer</span>

                                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                                        Figma
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -right-5 top-8 rounded-2xl border border-white/10 bg-white px-5 py-4 text-[#15173D] shadow-xl">
                            <div className="flex items-center gap-2">
                                <Users
                                    size={18}
                                    className="text-brand-primary"
                                />

                                <span className="font-bold">
                                    120+
                                </span>
                            </div>

                            <p className="text-xs text-gray-500">
                                Active Members
                            </p>
                        </div>

                        {/* Floating Applications */}
                        <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-white px-5 py-4 text-[#15173D] shadow-xl">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness
                                    size={18}
                                    className="text-brand-primary"
                                />

                                <span className="font-bold">
                                    85%
                                </span>
                            </div>

                            <p className="text-xs text-gray-500">
                                Match Rate
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}