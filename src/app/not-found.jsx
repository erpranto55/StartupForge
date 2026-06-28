"use client";

import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand-blush to-white px-6">
            <div className="max-w-xl text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-brand-primary/10">
                    <SearchX
                        size={56}
                        className="text-brand-primary"
                    />
                </div>

                <h1 className="mt-8 text-6xl font-black text-brand-ink">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-brand-ink">
                    Page Not Found
                </h2>

                <p className="mt-4 text-gray-500">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/opportunities"
                        className="rounded-xl border border-brand-primary px-6 py-3 font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                    >
                        Browse Opportunities
                    </Link>
                </div>
            </div>
        </div>
    );
}