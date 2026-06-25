"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlusCircle, Rocket } from "lucide-react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function StartupPage() {
    const { user, loading } = useAuth();

    const [startup, setStartup] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadStartup = async () => {
            try {
                const res = await axios.get(
                    `/api/startups/founder/${user.email}`
                );

                if (res.data.success && res.data.data.length > 0) {
                    setStartup(res.data.data[0]);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setPageLoading(false);
            }
        };

        loadStartup();
    }, [user]);

    if (loading || pageLoading) {
        return (
            <div className="py-20 text-center text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div>
            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-brand-ink">
                        My Startup
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create and manage your startup profile.
                    </p>
                </div>

                <Link
                    href="/dashboard/founder/startup/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                >
                    <PlusCircle size={18} />
                    Create Startup
                </Link>
            </div>

            {/* If startup exists */}

            {startup ? (
                <div className="mt-10 rounded-3xl bg-white p-8 shadow">
                    <div className="flex gap-8">
                        <Image
                            src={startup.logo}
                            alt={startup.startup_name}
                            width={120}
                            height={120}
                            className="rounded-xl object-cover"
                        />

                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold">
                                {startup.startup_name}
                            </h2>

                            <p>
                                <b>Industry:</b>{" "}
                                {startup.industry}
                            </p>

                            <p>
                                <b>Funding Stage:</b>{" "}
                                {startup.funding_stage}
                            </p>

                            <p>
                                <b>Status:</b>{" "}
                                {startup.status}
                            </p>

                            <p>{startup.description}</p>

                            <div className="pt-3 flex gap-3">
                                <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
                                    Edit
                                </button>

                                <button className="rounded-lg bg-red-600 px-5 py-2 text-white">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
                            <Rocket
                                size={40}
                                className="text-brand-primary"
                            />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">
                            No Startup Found
                        </h2>

                        <p className="mt-3 max-w-md text-gray-500">
                            You haven't created a startup yet.
                        </p>

                        <Link
                            href="/dashboard/founder/startup/create"
                            className="mt-6 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                        >
                            Create Your First Startup
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}