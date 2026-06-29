"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
    BriefcaseBusiness,
    ChevronRight,
    Compass,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu,
    Rocket,
    User,
    X,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import SafeAvatar from "@/components/profile/SafeAvatar";
import useCustomUser from "@/hooks/useCustomUser";

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
        href === "/"
            ? pathname === href
            : pathname?.startsWith(href);

    const router = useRouter();
    const { data: session, isPending } = useSession();
    const { customUser } = useCustomUser();

    return (
        <header className="sticky top-0 z-50 border-b border-brand-rose/30 bg-brand-blush/80 backdrop-blur-2xl">
            {/* Bottom Glow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-primary/50 to-transparent" />

            <nav className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Toggle Menu"
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        className="flex size-11 items-center justify-center rounded-full border border-brand-rose/50 bg-white/60 shadow-sm transition hover:bg-white lg:hidden"
                    >
                        {isMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        {/* Logo */}
                        <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-brand-primary via-brand-accent to-brand-primary shadow-xl shadow-brand-primary/20 ring-1 ring-white/30 transition-all duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="StartupForge"
                                width={50}
                                height={50}
                                className="object-contain p-1"
                                priority
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-brand-ink">
                                StartupForge
                            </h1>

                            <p className="-mt-1 text-xs font-medium text-brand-plum/70">
                                Build Startup Teams
                            </p>
                        </div>
                    </Link>

                    
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1 rounded-full border border-brand-rose/40 bg-white/60 p-1.5 shadow-lg shadow-brand-ink/5 backdrop-blur-xl">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all ${isActive(link.href)
                                    ? "bg-brand-ink text-white shadow-md shadow-brand-ink/15"
                                    : "text-brand-plum hover:bg-white hover:text-brand-ink"
                                }`}
                        >
                            <link.icon size={17} />
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right */}
                <div className="hidden min-[430px]:flex items-center gap-3">
                    {isPending ? (
                        <div className="h-11 w-32 animate-pulse rounded-full bg-gray-200" />
                    ) : session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="hidden sm:flex h-11 items-center gap-2 rounded-full border border-brand-primary/30 bg-white/70 px-5 text-sm font-semibold text-brand-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md"
                            >
                                <LayoutDashboard size={17} />
                                Dashboard
                            </Link>

                            <Link href="/profile" className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-brand-primary/30 bg-white/70 shadow-sm transition hover:shadow-md hover:border-brand-primary">
                                <SafeAvatar
                                    src={customUser?.image || session.user?.image}
                                    name={customUser?.name || session.user?.name}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </Link>

                            <button
                                onClick={async () => {
                                    try {
                                        await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/logout`, {
                                            method: "POST",
                                            credentials: "include",
                                        });
                                    } catch (err) {
                                        console.error(err);
                                    }
                                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                    await authClient.signOut();
                                    router.push("/login");
                                }}
                                className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:text-white"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="hidden sm:flex h-11 items-center gap-2 rounded-full border border-brand-primary/30 bg-white/70 px-5 text-sm font-semibold text-brand-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="flex h-11 items-center gap-2 rounded-full bg-linear-to-r from-brand-primary to-brand-accent px-6 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/40"
                            >
                                Get Started

                                <ChevronRight
                                    size={17}
                                    strokeWidth={2.4}
                                />
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 lg:hidden ${isMenuOpen
                        ? "max-h-125"
                        : "max-h-0"
                    }`}
            >
                <div className="border-t border-brand-rose/40 bg-brand-blush/90 backdrop-blur-2xl">
                    <div className="container mx-auto space-y-2 px-4 py-5">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() =>
                                    setIsMenuOpen(false)
                                }
                                className={`flex min-h-14 items-center justify-between rounded-2xl border px-4 text-base font-semibold transition ${isActive(link.href)
                                        ? "border-brand-ink bg-brand-ink text-white"
                                        : "border-brand-rose/50 bg-white/60 text-brand-plum hover:bg-white"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <link.icon size={18} />
                                    {link.label}
                                </span>

                                <ChevronRight size={18} />
                            </Link>
                        ))}

                        <div className="grid gap-3 pt-3 sm:hidden">
                            {isPending ? (
                                <div className="h-12 w-full animate-pulse rounded-full bg-gray-200" />
                            ) : session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-white/70 font-semibold text-brand-ink"
                                    >
                                        <LayoutDashboard size={17} />
                                        Dashboard
                                    </Link>
                                    
                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-white/70 font-semibold text-brand-ink"
                                    >
                                        <User size={17} />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={async () => {
                                            setIsMenuOpen(false);
                                            try {
                                                await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/api/custom-auth/logout`, {
                                                    method: "POST",
                                                    credentials: "include",
                                                });
                                            } catch (err) {
                                                console.error(err);
                                            }
                                            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                            await authClient.signOut();
                                            router.push("/login");
                                        }}
                                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-red-50 font-semibold text-red-500"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-white/70 font-semibold text-brand-ink"
                                    >
                                        <LogIn size={17} />
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-primary to-brand-accent font-semibold text-white"
                                    >
                                        Get Started

                                        <ChevronRight size={17} />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}