import RoleGuard from "@/components/dashboard/RoleGuard";

/**
 * Admin dashboard layout.
 *
 * Wraps all /dashboard/admin/* pages with the RBAC guard.
 */
export default function AdminLayout({ children }) {
    return <RoleGuard allowedRole="admin">{children}</RoleGuard>;
}
