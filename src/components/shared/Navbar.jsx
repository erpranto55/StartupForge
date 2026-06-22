"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BriefcaseBusiness,
    ChevronRight,
    Compass,
    LogIn,
    Menu,
    Rocket,
    X,
} from "lucide-react";
import Image from "next/image";

const links = [
    {
        label: "Home",
        href: "/",
        icon: Compass,
    },
    {
        label: "Browse Startups",
        href: "/startups",
        icon: Rocket,
    },
    {
        label: "Opportunities",
        href: "/opportunities",
        icon: BriefcaseBusiness,
    },
];

export default function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href) =>
        href === "/" ? pathname === href : pathname?.startsWith(href);

    return (
        <header className="sticky top-0 z-50 border-b border-brand-rose/45 bg-brand-blush/95 shadow-sm shadow-brand-ink/12 backdrop-blur-xl">
            <nav className="container mx-auto flex h-18 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-rose/50 bg-brand-blush text-brand-ink shadow-sm transition hover:border-brand-rose hover:bg-brand-rose/25 lg:hidden"
                    >
                        {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>

                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex min-w-0 items-center gap-2.5"
                        aria-label="StartupForge home"
                    >
                        <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-blush shadow-md shadow-brand-ink/15 ring-1 ring-brand-rose/60 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="StartupForge logo"
                                width={48}
                                height={48}
                                className="h-full w-full object-contain p-1"
                                priority
                            />
                        </span>
                        <span className="truncate text-xl font-black text-brand-ink sm:text-2xl">
                            StartupForge
                        </span>
                    </Link>
                </div>

                <div className="hidden items-center gap-1 rounded-full border border-brand-rose/55 bg-brand-rose/25 p-1 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all ${isActive(link.href)
                                ? "bg-brand-blush text-brand-ink shadow-sm ring-1 ring-brand-rose/50"
                                : "text-brand-plum hover:bg-brand-blush/80 hover:text-brand-ink"
                                }`}
                        >
                            <link.icon
                                size={17}
                                strokeWidth={2.2}
                            />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-2 min-[430px]:flex">
                    <Link
                        href="/login"
                        className="hidden h-11 items-center gap-2 rounded-full border border-brand-rose/50 bg-brand-blush/70 px-5 text-sm font-semibold text-brand-plum transition hover:border-brand-rose hover:bg-brand-rose/25 hover:text-brand-ink sm:flex"
                    >
                        <LogIn
                            size={17}
                            strokeWidth={2.2}
                        />
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="flex h-11 items-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-semibold text-white shadow-lg shadow-brand-ink/20 transition hover:bg-brand-plum"
                    >
                        Get Started
                        <ChevronRight
                            size={17}
                            strokeWidth={2.4}
                        />
                    </Link>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="border-t border-brand-rose/45 bg-brand-blush/98 shadow-xl shadow-brand-ink/12 lg:hidden">
                    <div className="container mx-auto grid gap-2 px-4 py-5 sm:px-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex min-h-14 items-center justify-between rounded-2xl border px-4 text-base font-semibold transition-colors ${isActive(link.href)
                                    ? "border-brand-ink bg-brand-ink text-white"
                                    : "border-brand-rose/50 bg-brand-blush/75 text-brand-plum hover:border-brand-rose hover:bg-brand-rose/25 hover:text-brand-ink"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <link.icon
                                        size={19}
                                        strokeWidth={2.2}
                                    />
                                    {link.label}
                                </span>
                                <ChevronRight
                                    size={18}
                                    strokeWidth={2.3}
                                />
                            </Link>
                        ))}

                        <div className="mt-3 grid gap-3 sm:hidden">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand-rose/50 bg-brand-blush/70 font-semibold text-brand-plum hover:border-brand-rose hover:bg-brand-rose/25"
                            >
                                <LogIn
                                    size={17}
                                    strokeWidth={2.2}
                                />
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-ink font-semibold text-white shadow-lg shadow-brand-ink/20 hover:bg-brand-plum"
                            >
                                Get Started
                                <ChevronRight
                                    size={17}
                                    strokeWidth={2.4}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}


