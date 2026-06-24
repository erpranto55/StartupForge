"use client";

import { useState } from "react";
import {
    Ban,
    CheckCircle,
    Search,
} from "lucide-react";

const initialUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Founder",
        isBlocked: false,
    },
    {
        id: 2,
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "Collaborator",
        isBlocked: true,
    },
    {
        id: 3,
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "Founder",
        isBlocked: false,
    },
];

export default function ManageUsersPage() {
    const [users, setUsers] =
        useState(initialUsers);

    const toggleBlock = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        isBlocked:
                            !user.isBlocked,
                    }
                    : user
            )
        );
    };

    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Manage Users
                </h1>

                <p className="mt-2 text-gray-500">
                    View, block, and manage
                    platform users.
                </p>
            </div>

            {/* Search */}
            <div className="relative mt-8">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm"
                />
            </div>

            {/* Table */}
            <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-6 py-4 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b last:border-none"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.isBlocked ? (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                                                Blocked
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                                                Active
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                toggleBlock(
                                                    user.id
                                                )
                                            }
                                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-white ${user.isBlocked
                                                    ? "bg-green-600"
                                                    : "bg-red-600"
                                                }`}
                                        >
                                            {user.isBlocked ? (
                                                <>
                                                    <CheckCircle size={16} />
                                                    Unblock
                                                </>
                                            ) : (
                                                <>
                                                    <Ban size={16} />
                                                    Block
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}