import {
    LayoutDashboard,
    Rocket,
    Plus,
    BriefcaseBusiness,
    FileText,
    User,
    Users,
    DollarSign,
    Compass,
} from "lucide-react";

/**
 * Single source of truth for all role-based sidebar navigation.
 *
 * Each entry:
 *   label  – display text
 *   href   – route (exact match or prefix for active state)
 *   icon   – Lucide icon component
 *   exact  – if true, only mark active on exact match (not prefix)
 */
export const roleNavigation = {
    founder: [
        {
            label: "Dashboard Overview",
            href: "/dashboard/founder",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            label: "My Startup",
            href: "/dashboard/founder/startup",
            icon: Rocket,
        },
        {
            label: "Add Opportunity",
            href: "/dashboard/founder/opportunities/add",
            icon: Plus,
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
            href: "/dashboard/founder/profile",
            icon: User,
        },
    ],

    collaborator: [
        {
            label: "Dashboard Overview",
            href: "/dashboard/collaborator",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            label: "Browse Opportunities",
            href: "/opportunities",
            icon: Compass,
        },
        {
            label: "My Applications",
            href: "/dashboard/collaborator/applications",
            icon: FileText,
        },
        {
            label: "Profile",
            href: "/dashboard/collaborator/profile",
            icon: User,
        },
    ],

    admin: [
        {
            label: "Dashboard Overview",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            label: "Manage Users",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            label: "Manage Startups",
            href: "/dashboard/admin/startups",
            icon: Rocket,
        },
        {
            label: "Transactions",
            href: "/dashboard/admin/transactions",
            icon: DollarSign,
        },
    ],
};

/** Returns the home dashboard path for a given role. */
export const roleDashboardPath = {
    founder: "/dashboard/founder",
    collaborator: "/dashboard/collaborator",
    admin: "/dashboard/admin",
};

/** Role-specific topbar greeting strings. */
export const roleGreeting = {
    founder: "Welcome back, Founder",
    collaborator: "Welcome back, Collaborator",
    admin: "Welcome, Administrator",
};

/** Role badge color config (Tailwind classes). */
export const roleBadgeStyle = {
    founder: "bg-brand-primary/15 text-brand-primary",
    collaborator: "bg-blue-100 text-blue-700",
    admin: "bg-amber-100 text-amber-700",
};
