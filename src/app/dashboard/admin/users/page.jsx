"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Ban,
    CheckCircle,
    Search,
    User,
    RefreshCw,
} from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/users");
            const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
            setUsers(data);
            setFiltered(data);
        } catch (err) {
            toast.error("Failed to load users");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Live search filter
    useEffect(() => {
        const q = search.toLowerCase();
        setFiltered(
            users.filter(
                (u) =>
                    u.name?.toLowerCase().includes(q) ||
                    u.email?.toLowerCase().includes(q) ||
                    u.role?.toLowerCase().includes(q)
            )
        );
    }, [search, users]);

    const toggleBlock = async (user) => {
        const endpoint = user.isBlocked
            ? `/api/users/unblock/${user._id}`
            : `/api/users/block/${user._id}`;

        setActionLoading(user._id);
        try {
            await axios.patch(endpoint);
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id
                        ? { ...u, isBlocked: !u.isBlocked }
                        : u
                )
            );
            toast.success(
                user.isBlocked
                    ? `${user.name} has been unblocked.`
                    : `${user.name} has been blocked.`
            );
        } catch (err) {
            toast.error("Action failed. Please try again.");
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const roleBadge = (role) => {
        const styles = {
            founder: "bg-brand-primary/10 text-brand-primary",
            collaborator: "bg-blue-100 text-blue-700",
            admin: "bg-amber-100 text-amber-700",
        };
        return styles[role] ?? "bg-gray-100 text-gray-600";
    };

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-brand-ink">
                        Manage Users
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {users.length} registered users on the platform.
                    </p>
                </div>

                <button
                    id="refresh-users-btn"
                    type="button"
                    onClick={fetchUsers}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-brand-blush px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-primary/10 disabled:opacity-60"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* ── Search ── */}
            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    id="user-search-input"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email or role…"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition"
                />
            </div>

            {/* ── Table ── */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                {loading ? (
                    <div className="space-y-3 p-6">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-14 animate-pulse rounded-2xl bg-gray-100"
                            />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <User size={40} className="mb-3 text-gray-300" />
                        <p className="font-semibold text-gray-500">No users found</p>
                        <p className="mt-1 text-sm text-gray-400">
                            Try adjusting your search.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((user) => {
                                    const initials = user.name
                                        ? user.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")
                                              .slice(0, 2)
                                              .toUpperCase()
                                        : "?";
                                    const isActioning =
                                        actionLoading === user._id;

                                    return (
                                        <tr
                                            key={user._id}
                                            className="border-b transition last:border-none hover:bg-gray-50/60"
                                        >
                                            {/* Avatar + name + email */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-sm font-bold text-white">
                                                        {user.image ? (
                                                            <Image
                                                                src={user.image}
                                                                alt={user.name ?? ""}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <span>{initials}</span>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold text-brand-ink">
                                                            {user.name}
                                                        </p>
                                                        <p className="truncate text-xs text-gray-400">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role badge */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${roleBadge(user.role)}`}
                                                >
                                                    {user.role ?? "—"}
                                                </span>
                                            </td>

                                            {/* Status badge */}
                                            <td className="px-6 py-4">
                                                {user.isBlocked ? (
                                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                                                        Blocked
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                        Active
                                                    </span>
                                                )}
                                            </td>

                                            {/* Block / Unblock */}
                                            <td className="px-6 py-4">
                                                <button
                                                    id={`toggle-block-${user._id}`}
                                                    type="button"
                                                    disabled={isActioning}
                                                    onClick={() => toggleBlock(user)}
                                                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition disabled:opacity-60 ${
                                                        user.isBlocked
                                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                                            : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                                >
                                                    {isActioning ? (
                                                        <RefreshCw
                                                            size={13}
                                                            className="animate-spin"
                                                        />
                                                    ) : user.isBlocked ? (
                                                        <>
                                                            <CheckCircle size={13} />
                                                            Unblock
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Ban size={13} />
                                                            Block
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}