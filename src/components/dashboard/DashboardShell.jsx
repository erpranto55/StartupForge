"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

/**
 * Unified dashboard layout shell.
 *
 * Renders:
 *   - Desktop: fixed sidebar (left) + scrollable main area (right)
 *   - Mobile/Tablet: hamburger-triggered drawer sidebar + topbar always visible
 *
 * Props:
 *   role       – "founder" | "collaborator" | "admin"
 *   customUser – full DB user object passed down from RoleGuard
 *   children   – the page content
 */
export default function DashboardShell({ role, customUser, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-brand-blush">
            {/* ── Sidebar ── */}
            <DashboardSidebar
                role={role}
                customUser={customUser}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* ── Main area ── */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <DashboardTopbar
                    role={role}
                    customUser={customUser}
                    onMenuClick={() => setSidebarOpen((prev) => !prev)}
                />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
