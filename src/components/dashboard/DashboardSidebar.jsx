"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { roleNavigation, roleBadgeStyle } from "@/constants/roleBasedNavigation";

/**
 * Dynamic role-aware sidebar.
 *
 * Props:
 *   role       – "founder" | "collaborator" | "admin"
 *   customUser – full DB user object
 *   isOpen     – boolean (controls mobile drawer visibility)
 *   onClose    – callback to close mobile drawer
 */
export default function DashboardSidebar({ role, customUser, isOpen, onClose }) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = roleNavigation[role] ?? [];
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

    const handleLogout = async () => {
        try {
            // Clear our custom JWT cookie
            await fetch("http://localhost:5000/api/custom-auth/logout", {
                method: "POST",
                credentials: "include",
            });
            // Sign out from Better Auth
            await authClient.signOut();
        } catch {
            // Still navigate away even if logout request fails
        }
        router.push("/login");
    };

    const isActive = (item) => {
        if (item.exact) return pathname === item.href;
        // For "Add Opportunity", treat it as active only if exact
        if (item.href.includes("?")) return false;
        return pathname === item.href || pathname.startsWith(item.href + "/");
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-gradient-to-b from-[#1d1f4e] to-[#15173D] text-white">
            {/* ── Logo ── */}
            <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
                <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-primary shadow-lg shadow-brand-primary/40">
                    <Image
                        src="/logo.png"
                        alt="StartupForge"
                        width={28}
                        height={28}
                        className="object-contain p-0.5"
                        priority
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-black text-white">StartupForge</p>
                    <p className="text-[10px] capitalize text-white/40">
                        {role} Portal
                    </p>
                </div>

                {/* Mobile close button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close sidebar"
                    className="ml-auto flex size-7 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 lg:hidden"
                >
                    <X size={14} />
                </button>
            </div>

            {/* ── Navigation ── */}
            <nav className="flex-1 overflow-y-auto px-3 py-5">
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Navigation
                </p>
                <ul className="space-y-0.5">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <li key={item.href + item.label}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        active
                                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/40"
                                            : "text-white/60 hover:bg-white/8 hover:text-white"
                                    }`}
                                >
                                    <item.icon
                                        size={16}
                                        className={active ? "text-white" : ""}
                                    />
                                    <span className="truncate">{item.label}</span>

                                    {active && (
                                        <motion.span
                                            layoutId="active-nav-indicator"
                                            className="ml-auto size-1.5 rounded-full bg-white/70"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ── User profile + logout ── */}
            <div className="border-t border-white/10 p-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                    {/* Avatar */}
                    <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-sm font-bold text-white">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name ?? "Avatar"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">
                            {user?.name ?? "Loading..."}
                        </p>
                        <span
                            className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${badgeStyle}`}
                        >
                            {role}
                        </span>
                    </div>

                    {/* Logout */}
                    <button
                        id="sidebar-logout-btn"
                        type="button"
                        onClick={handleLogout}
                        title="Logout"
                        className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-red-500/20 hover:text-red-400"
                    >
                        <LogOut size={15} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Desktop sidebar (always visible on lg+) ── */}
            <aside className="hidden w-64 shrink-0 overflow-hidden lg:flex lg:flex-col">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <SidebarContent />
                </div>
            </aside>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                            onClick={onClose}
                        />

                        {/* Drawer panel */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                            className="fixed inset-y-0 left-0 z-40 w-64 overflow-hidden lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}