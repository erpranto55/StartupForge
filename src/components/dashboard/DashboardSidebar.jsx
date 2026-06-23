"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Rocket,
    BriefcaseBusiness,
    FileText,
    User,
} from "lucide-react";

const links = [
    {
        label: "Overview",
        href: "/dashboard/founder",
        icon: LayoutDashboard,
    },
    {
        label: "My Startup",
        href: "/dashboard/founder/startup",
        icon: Rocket,
    },
    {
        label: "Manage Opportunities",
        href: "/dashboard/founder/opportunities",
        icon: BriefcaseBusiness,
    },
    {
        label: "Applications",
        href: "/dashboard/founder/applications",
        icon: FileText,
    },
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 h-screen w-72 border-r border-brand-rose/20 bg-white p-5">
            <h2 className="mb-10 text-2xl font-black text-brand-ink">
                Dashboard
            </h2>

            <div className="space-y-2">
                {links.map((link) => {
                    const active =
                        pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${active
                                    ? "bg-brand-primary text-white"
                                    : "hover:bg-brand-blush"
                                }`}
                        >
                            <link.icon size={18} />

                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}