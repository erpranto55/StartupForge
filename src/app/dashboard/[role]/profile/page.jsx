"use client";

import Link from "next/link";
import useCustomUser from "@/hooks/useCustomUser";
import {
    Mail,
    Pencil,
    User2,
    MapPin,
    Calendar,
    Briefcase,
    Sparkles,
} from "lucide-react";
import { Globe, LogoGithub } from "@gravity-ui/icons";

import SafeAvatar from "@/components/profile/SafeAvatar";

export default function ProfilePage() {
    const { customUser, loading } = useCustomUser();

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>

                    <p className="text-lg font-semibold text-brand-ink">
                        Loading Profile...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">

            {/* ================= HERO ================= */}

            <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl">

                {/* Banner */}

                <div className="relative h-72 bg-linear-to-r from-brand-primary via-fuchsia-600 to-indigo-600">

                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                    <div className="absolute inset-0 bg-black/10"></div>

                </div>

                {/* Profile */}

                <div className="relative px-10 pb-10">

                    {/* Avatar */}

                    <div className="-mt-20">

                        <SafeAvatar
                            src={customUser?.image}
                            name={customUser?.name}
                            alt="Profile"
                            className="h-40 w-40 rounded-full border-[6px] border-white bg-white object-cover shadow-2xl"
                        />

                    </div>

                    <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        {/* Left */}

                        <div>

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-5xl font-black text-brand-ink">
                                    {customUser?.name || "Unnamed User"}
                                </h1>

                                <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">

                                    {customUser?.role}

                                </span>

                            </div>

                            <div className="mt-6 flex flex-wrap gap-6 text-gray-600">

                                <div className="flex items-center gap-2">

                                    <Mail size={18} />

                                    {customUser?.email}

                                </div>

                                <div className="flex items-center gap-2">

                                    <MapPin size={18} />

                                    Bangladesh

                                </div>

                                <div className="flex items-center gap-2">

                                    <Calendar size={18} />

                                    StartupForge Member

                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex gap-3">

                            <Link
                                href={`/dashboard/${customUser?.role}/profile/edit`}
                                className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Pencil size={18} />

                                Edit Profile

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= CONTENT ================= */}

            <div className="mt-10 grid gap-8 lg:grid-cols-3">

                {/* LEFT SIDE */}

                <div className="space-y-8 lg:col-span-2">

                    {/* About */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">

                            <User2 className="text-brand-primary" />

                            <h2 className="text-2xl font-bold text-brand-ink">

                                About Me

                            </h2>

                        </div>

                        <p className="leading-8 text-gray-600">

                            {customUser?.bio ||

                                "Tell founders and collaborators about yourself. Mention your experience, interests and what you're looking for inside StartupForge."

                            }

                        </p>

                    </div>

                    {/* Skills */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">

                            <Briefcase className="text-brand-primary" />

                            <h2 className="text-2xl font-bold text-brand-ink">

                                Skills

                            </h2>

                        </div>

                        <div className="flex flex-wrap gap-3">
                            {customUser?.skills?.length ? (

                                customUser.skills.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="rounded-full bg-linear-to-r from-brand-primary/10 to-indigo-100 px-4 py-2 text-sm font-semibold text-brand-primary shadow-sm"
                                    >
                                        {skill}
                                    </span>

                                ))

                            ) : (

                                <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

                                    <Sparkles
                                        size={32}
                                        className="mx-auto mb-3 text-brand-primary"
                                    />

                                    <p className="font-medium text-gray-500">
                                        No skills added yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* Social Links */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold text-brand-ink">

                            Social Links

                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            {/* GitHub */}

                            <a
                                href={customUser?.github || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group rounded-3xl border p-6 transition duration-300 ${customUser?.github
                                    ? "hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg"
                                    : "cursor-not-allowed opacity-60"
                                    }`}
                            >

                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">

                                    <LogoGithub className="text-brand-primary" />

                                </div>

                                <h3 className="text-xl font-bold">

                                    GitHub

                                </h3>

                                <p className="mt-2 text-sm text-gray-500">

                                    {customUser?.github
                                        ? "View GitHub Profile"
                                        : "GitHub profile not added."}

                                </p>

                            </a>

                            {/* Portfolio */}

                            <a
                                href={customUser?.portfolio || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group rounded-3xl border p-6 transition duration-300 ${customUser?.portfolio
                                    ? "hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg"
                                    : "cursor-not-allowed opacity-60"
                                    }`}
                            >

                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">

                                    <Globe />

                                </div>

                                <h3 className="text-xl font-bold">

                                    Portfolio

                                </h3>

                                <p className="mt-2 text-sm text-gray-500">

                                    {customUser?.portfolio
                                        ? "Visit Personal Portfolio"
                                        : "Portfolio not added."}

                                </p>

                            </a>

                        </div>

                    </div>

                    {/* Developer Highlights */}

                    <div className="rounded-3xl bg-linear-to-r from-brand-primary to-indigo-600 p-8 text-white">

                        <h2 className="text-2xl font-bold">

                            Developer Highlights

                        </h2>

                        <p className="mt-4 leading-8 text-white/90">

                            A complete profile helps founders understand your
                            expertise and increases your chances of getting
                            invited to startup teams. Showcase your skills,
                            portfolio and GitHub to build trust.

                        </p>

                    </div>

                </div>

                {/* ================= RIGHT SIDEBAR ================= */}

                <div className="space-y-8">

                    {/* Profile Summary */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold">

                            Profile Summary

                        </h2>

                        <div className="space-y-6">

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Name

                                </span>

                                <span className="font-semibold">

                                    {customUser?.name}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Role

                                </span>

                                <span className="font-semibold capitalize">

                                    {customUser?.role}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Skills

                                </span>

                                <span className="font-semibold">

                                    {customUser?.skills?.length || 0}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    GitHub

                                </span>

                                <span className="font-semibold">

                                    {customUser?.github
                                        ? "Connected"
                                        : "Not Added"}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Portfolio

                                </span>

                                <span className="font-semibold">

                                    {customUser?.portfolio
                                        ? "Connected"
                                        : "Not Added"}

                                </span>

                            </div>

                        </div>

                    </div>
                    {/* Profile Completion */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="text-2xl font-bold text-brand-ink">
                            Profile Completion
                        </h2>

                        {(() => {
                            const completed = [
                                customUser?.name,
                                customUser?.image,
                                customUser?.bio,
                                customUser?.skills?.length,
                                customUser?.github,
                                customUser?.portfolio,
                            ].filter(Boolean).length;

                            const percentage = Math.round(
                                (completed / 6) * 100
                            );

                            return (
                                <>
                                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-linear-to-r from-brand-primary to-indigo-600 transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <p className="text-sm text-gray-500">
                                            {percentage}% Completed
                                        </p>

                                        <span className="font-bold text-brand-primary">
                                            {completed}/6
                                        </span>

                                    </div>
                                </>
                            );
                        })()}

                    </div>

                    {/* Quick Actions */}

                    <div className="rounded-3xl bg-linear-to-br from-brand-primary via-fuchsia-600 to-indigo-600 p-8 text-white shadow-xl">

                        <h2 className="text-2xl font-bold">
                            Complete Your Profile
                        </h2>

                        <p className="mt-4 leading-7 text-white/90">
                            A complete profile increases your visibility to
                            founders and collaborators. Add your skills,
                            portfolio and GitHub to stand out.
                        </p>

                        <Link
                            href={`/dashboard/${customUser?.role}/profile/edit`}
                            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-brand-primary transition hover:scale-[1.02]"
                        >
                            <Pencil size={18} className="mr-2" />
                            Edit Profile
                        </Link>

                    </div>

                    {/* Account Information */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold text-brand-ink">
                            Account
                        </h2>

                        <div className="space-y-5">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Email Address
                                </p>

                                <p className="mt-1 font-semibold text-brand-ink">
                                    {customUser?.email}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Account Role
                                </p>

                                <span className="mt-2 inline-flex rounded-full bg-brand-primary/10 px-4 py-2 font-semibold capitalize text-brand-primary">
                                    {customUser?.role}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}