"use client";

import { useState } from "react";
import {
    CheckCircle,
    Trash2,
    Rocket,
} from "lucide-react";

const initialStartups = [
    {
        id: 1,
        startupName: "AI Nexus",
        founder: "John Doe",
        industry: "Artificial Intelligence",
        status: "Pending",
    },
    {
        id: 2,
        startupName: "FinPilot",
        founder: "Sarah Smith",
        industry: "FinTech",
        status: "Approved",
    },
    {
        id: 3,
        startupName: "HealthSync",
        founder: "Alex Johnson",
        industry: "HealthTech",
        status: "Pending",
    },
];

export default function ManageStartupsPage() {
    const [startups, setStartups] =
        useState(initialStartups);

    const handleApprove = (id) => {
        setStartups((prev) =>
            prev.map((startup) =>
                startup.id === id
                    ? {
                        ...startup,
                        status: "Approved",
                    }
                    : startup
            )
        );
    };

    const handleDelete = (id) => {
        setStartups((prev) =>
            prev.filter(
                (startup) =>
                    startup.id !== id
            )
        );
    };

    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Manage Startups
                </h1>

                <p className="mt-2 text-gray-500">
                    Review, approve, and remove
                    startup profiles.
                </p>
            </div>

            {/* Cards */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {startups.map((startup) => (
                    <div
                        key={startup.id}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
                                    <Rocket
                                        className="text-brand-primary"
                                    />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold text-brand-ink">
                                    {startup.startupName}
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Founder:{" "}
                                    {startup.founder}
                                </p>

                                <p className="mt-1 text-gray-500">
                                    Industry:{" "}
                                    {startup.industry}
                                </p>

                                <div className="mt-4">
                                    {startup.status ===
                                        "Approved" ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            {startup.status !==
                                "Approved" && (
                                    <button
                                        onClick={() =>
                                            handleApprove(
                                                startup.id
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white"
                                    >
                                        <CheckCircle
                                            size={18}
                                        />
                                        Approve
                                    </button>
                                )}

                            <button
                                onClick={() =>
                                    handleDelete(
                                        startup.id
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white"
                            >
                                <Trash2
                                    size={18}
                                />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}