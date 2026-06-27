"use client";

import SafeAvatar from "@/components/profile/SafeAvatar";
import { Bell, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { roleGreeting, roleBadgeStyle } from "@/constants/roleBasedNavigation";
import DashboardBreadcrumb from "./DashboardBreadcrumb";

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

                <div className="hidden items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-3 py-2 sm:flex">
                    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-sm font-bold text-white">
                        {user?.image ? (
                            <SafeAvatar
                                src={user.image}
                                name={user.name}
                                alt={user.name ?? "Avatar"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>

                    <div className="hidden min-w-0 md:block">
                        <p className="max-w-30 truncate text-xs font-semibold text-brand-ink">
                            {user?.name ?? "..."}
                        </p>
                        <span
                            className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${badgeStyle}`}
                        >
                            {role}
                        </span>
                    </div>

                    <ChevronDown size={14} className="text-gray-400" />
                </div>
            </div>
        </header>
    );
}
