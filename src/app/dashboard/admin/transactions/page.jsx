"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/axios";
import {
    CreditCard,
    CheckCircle,
    Clock3,
    Search,
} from "lucide-react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const res = await axios.get("/api/payments");
            setTransactions(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        const keyword = search.toLowerCase();

        return transactions.filter((payment) =>
            payment.user_email?.toLowerCase().includes(keyword) ||
            payment.transaction_id?.toLowerCase().includes(keyword)
        );
    }, [transactions, search]);

    if (loading) {
        return (
            <div className="mt-20 text-center text-lg font-semibold">
                Loading Transactions...
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Transactions
                </h1>

                <p className="mt-2 text-gray-500">
                    View premium founder payments.
                </p>
            </div>

            <div className="relative mt-8 max-w-md">
                <Search
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email..."
                    className="w-full rounded-xl border py-3 pl-11 pr-4"
                />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-6 py-4 text-left">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Amount
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Transaction ID
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((payment) => (
                                <tr
                                    key={payment._id}
                                    className="border-b last:border-none"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
                                                <CreditCard
                                                    size={18}
                                                    className="text-brand-primary"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-medium">
                                                    {payment.user_email}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Premium Founder
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        $
                                        {payment.amount}
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {payment.transaction_id || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(
                                            payment.paid_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        {payment.payment_status === "Paid" ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                <CheckCircle size={14} />
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                <Clock3 size={14} />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!filtered.length && (
                        <div className="py-12 text-center text-gray-500">
                            No transactions found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}