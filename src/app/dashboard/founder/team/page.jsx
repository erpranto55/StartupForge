"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

import { toast } from "react-toastify";

import {
    Users,
    Mail,
    BriefcaseBusiness,
    Globe,
    CalendarDays,
} from "lucide-react";

export default function TeamPage() {
    const { user, loading } = useAuth();

    const [team, setTeam] = useState([]);

    const [pageLoading, setPageLoading] =
        useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const loadTeam = async () => {
            try {
                const res = await axios.get(
                    `/api/startups/team/${user.email}`
                );

                if (res.data.success) {
                    setTeam(res.data.data);
                }
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load team members"
                );
            } finally {
                setPageLoading(false);
            }
        };

        loadTeam();
    }, [user]);

    if (loading || pageLoading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div>
            {/* Header */}

            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Startup Team
                </h1>

                <p className="mt-2 text-gray-500">
                    View all accepted members of your
                    startup.
                </p>
            </div>

            {/* Empty State */}

            {team.length === 0 && (
                <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm">
                    <Users
                        size={60}
                        className="mx-auto text-brand-primary"
                    />

                    <h2 className="mt-6 text-2xl font-bold">
                        No Team Members Yet
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Accept collaborator
                        applications to build your
                        startup team.
                    </p>
                </div>
            )}

            {/* Team Members */}

            {team.length > 0 && (
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {team.map((member) => (
                        <div
                            key={member.user_email}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                    <Users className="text-brand-primary" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-brand-ink">
                                        {member.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} />

                                    <span>
                                        {
                                            member.user_email
                                        }
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BriefcaseBusiness
                                        size={18}
                                    />

                                    <span>
                                        {member.role}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CalendarDays
                                        size={18}
                                    />

                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            member.joined_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                {member.portfolio && (
                                    <div className="flex items-center gap-3">
                                        <Globe
                                            size={18}
                                        />

                                        <a
                                            href={
                                                member.portfolio
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-brand-primary hover:underline"
                                        >
                                            View
                                            Portfolio
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}