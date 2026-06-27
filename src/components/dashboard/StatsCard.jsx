"use client";

import { motion } from "framer-motion";

/**
 * Reusable stat card used on all three role dashboards.
 *
 * Props:
 *   icon    – Lucide icon component
 *   value   – string or number to display large
 *   label   – descriptive label below the value
 *   color   – "purple" | "blue" | "green" | "yellow" | "red" | "orange"
 *   delay   – Framer Motion stagger delay (seconds)
 */

const colorMap = {
    purple: {
        ring: "bg-brand-primary/10",
        icon: "text-brand-primary",
        glow: "shadow-brand-primary/10",
    },
    blue: {
        ring: "bg-blue-50",
        icon: "text-blue-600",
        glow: "shadow-blue-500/10",
    },
    green: {
        ring: "bg-emerald-50",
        icon: "text-emerald-600",
        glow: "shadow-emerald-500/10",
    },
    yellow: {
        ring: "bg-amber-50",
        icon: "text-amber-600",
        glow: "shadow-amber-500/10",
    },
    red: {
        ring: "bg-red-50",
        icon: "text-red-500",
        glow: "shadow-red-500/10",
    },
    orange: {
        ring: "bg-orange-50",
        icon: "text-orange-600",
        glow: "shadow-orange-500/10",
    },
};

export default function StatsCard({
    icon: Icon,
    value,
    label,
    color = "purple",
    delay = 0,
}) {
    const c = colorMap[color] ?? colorMap.purple;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={`group rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg ${c.glow} transition-all duration-300 hover:-translate-y-0.5`}
        >
            {/* Icon badge */}
            <div
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${c.ring} transition-transform duration-300 group-hover:scale-110`}
            >
                <Icon size={22} className={c.icon} />
            </div>

            {/* Value */}
            <p className="mt-5 text-4xl font-black tracking-tight text-brand-ink">
                {value ?? "—"}
            </p>

            {/* Label */}
            <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
        </motion.div>
    );
}
