"use client";

import SafeAvatar from "@/components/profile/SafeAvatar";
import { Bell, Menu, ChevronDown, Crown } from "lucide-react";
import { useState } from "react";
import { roleGreeting, roleBadgeStyle } from "@/constants/roleBasedNavigation";
import DashboardBreadcrumb from "./DashboardBreadcrumb";
import Link from "next/link";

export default function DashboardTopbar({ role, customUser, onMenuClick }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const greeting = roleGreeting[role] ?? "Welcome back";
    const badgeStyle = roleBadgeStyle[role] ?? "";
    const user = customUser;
    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?";

    return (
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
            <button
                id="sidebar-toggle-btn"
                type="button"
                onClick={onMenuClick}
                aria-label="Toggle sidebar"
                className="flex size-9 items-center justify-center rounded-xl bg-brand-blush text-brand-ink transition hover:bg-brand-primary/10 lg:hidden"
            >
                <Menu size={18} />
            </button>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-brand-ink sm:text-base">
                    {greeting}
                </p>
                <DashboardBreadcrumb />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                    <button
                        id="notification-bell-btn"
                        type="button"
                        onClick={() => setNotifOpen(!notifOpen)}
                        aria-label="Notifications"
                        className="relative flex size-9 items-center justify-center rounded-xl bg-brand-blush text-brand-ink transition hover:bg-brand-primary/10"
                    >
                        <Bell size={17} />
                        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand-primary" />
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Notifications
                            </p>
                            <p className="text-sm text-gray-500">No new notifications.</p>
                        </div>
                    )}
                </div>

                <div className=" mt-2">
                    {role === "founder" && (
                        user?.isPremium ? (
                            <div className="mx-3 mb-3 flex items-center justify-center gap-2 rounded-2xl bg-yellow-100 px-4 py-3 font-semibold text-yellow-700">
                                <Crown size={18} />
                                Premium Founder
                            </div>
                        ) : (
                            <Link
                                href="/dashboard/founder/premium"
                                className="mx-3 mb-3 flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-yellow-500 to-orange-500 px-4 py-3 font-semibold text-white transition hover:scale-[1.02]"
                            >
                                <Crown size={18} />
                                Upgrade to Premium
                            </Link>
                        )
                    )}
                </div>


            </div>
        </header>
    );
}
