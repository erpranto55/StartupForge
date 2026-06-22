"use client";

import { motion } from "motion/react";
import {
    Quote,
    Star,
    Building2,
    Users,
} from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Founder",
        company: "AI Nexus",
        review:
            "StartupForge helped us find talented developers within days. Building our startup team has never been easier.",
        icon: Building2,
    },
    {
        id: 2,
        name: "Michael Johnson",
        role: "Frontend Developer",
        company: "FinPilot",
        review:
            "I discovered an exciting startup opportunity and connected directly with founders who shared my vision.",
        icon: Users,
    },
    {
        id: 3,
        name: "Emily Carter",
        role: "Product Designer",
        company: "HealthSync",
        review:
            "The platform is intuitive, professional, and made collaboration between founders and builders seamless.",
        icon: Users,
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#F1E9E9] py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">
                        Testimonials
                    </span>

                    <h2 className="mt-5 text-4xl font-black text-[#15173D] lg:text-5xl">
                        Loved By Founders
                        <span className="block text-brand-primary">
                            And Collaborators
                        </span>
                    </h2>

                    <p className="mt-5 text-lg text-gray-600">
                        Hear what startup founders and talented
                        builders are saying about StartupForge.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-16 grid gap-6 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
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
                                delay: index * 0.15,
                            }}
                            className="group rounded-[28px] border border-[#E491C9]/20 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Quote */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                <Quote
                                    size={26}
                                    className="text-brand-primary"
                                />
                            </div>

                            {/* Rating */}
                            <div className="mt-6 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill="#E491C9"
                                        stroke="#E491C9"
                                    />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="mt-5 leading-8 text-gray-600">
                                `{testimonial.review}`
                            </p>

                            {/* User */}
                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                                    <testimonial.icon
                                        size={22}
                                        className="text-brand-primary"
                                    />
                                </div>

                                <div>
                                    <h4 className="font-bold text-[#15173D]">
                                        {testimonial.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {testimonial.role} · {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}