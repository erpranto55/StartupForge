/**
 * Dashboard root layout — intentionally minimal.
 *
 * Purpose: establish the /dashboard route group WITHOUT the public Navbar/Footer
 * (ConditionalLayout in root layout already suppresses those).
 *
 * Each role sub-layout (founder / collaborator / admin) injects its own
 * DashboardShell via RoleGuard, so this wrapper just passes children through.
 *
 * /dashboard/page.jsx (the smart redirect) renders without a shell, which is
 * correct — it only shows a brief spinner before redirecting.
 */
export default function DashboardLayout({ children }) {
    return <>{children}</>;
}