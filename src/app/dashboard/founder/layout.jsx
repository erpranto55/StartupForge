import RoleGuard from "@/components/dashboard/RoleGuard";

/**
 * Founder dashboard layout.
 *
 * Wraps all /dashboard/founder/* pages with the RBAC guard.
 * RoleGuard verifies the session, fetches the DB user, confirms
 * the role is "founder", then renders DashboardShell + the page.
 */
export default function FounderLayout({ children }) {
    return <RoleGuard allowedRole="founder">{children}</RoleGuard>;
}
