import RoleGuard from "@/components/dashboard/RoleGuard";

/**
 * Collaborator dashboard layout.
 *
 * Wraps all /dashboard/collaborator/* pages with the RBAC guard.
 */
export default function CollaboratorLayout({ children }) {
    return <RoleGuard allowedRole="collaborator">{children}</RoleGuard>;
}
