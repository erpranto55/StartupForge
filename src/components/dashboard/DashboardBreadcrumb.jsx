"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Auto-generates a breadcrumb trail from the current pathname.
 *
 * /dashboard/founder/applications
 *   → Dashboard > Founder > Applications
 */

function formatSegment(segment) {
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DashboardBreadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    // segments = ['dashboard', 'founder', 'applications']

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-xs text-gray-400"
        >
            <Link href="/" className="transition-colors hover:text-brand-primary" aria-label="Home">
                <Home size={12} className="shrink-0" />
            </Link>

            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                const label = formatSegment(segment);

                return (
                    <span key={href} className="flex items-center gap-1">
                        <ChevronRight size={11} className="shrink-0" />
                        {isLast ? (
                            <span className="font-semibold text-brand-ink">
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="transition hover:text-brand-primary"
                            >
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
