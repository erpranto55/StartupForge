"use client";

import { usePathname } from "next/navigation";
import MainNavbar from "./Navbar";
import Footer from "./Footer";

/**
 * Wraps the page content and conditionally renders the public
 * Navbar and Footer.  Dashboard pages must not show the public nav.
 */
export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    if (isDashboard) {
        // Dashboard handles its own layout via DashboardShell
        return <>{children}</>;
    }

    return (
        <main className="flex-1 flex flex-col">
            <MainNavbar />
            {children}
            <Footer />
        </main>
    );
}
