import {
    CreditCard,
    CheckCircle,
    Clock3,
} from "lucide-react";

const transactions = [
    {
        id: 1,
        user: "john@example.com",
        amount: 29,
        date: "2026-08-12",
        status: "Paid",
    },
    {
        id: 2,
        user: "sarah@example.com",
        amount: 29,
        date: "2026-08-15",
        status: "Pending",
    },
    {
        id: 3,
        user: "alex@example.com",
        amount: 29,
        date: "2026-08-20",
        status: "Paid",
    },
];

export default function TransactionsPage() {
    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Transactions
                </h1>

                <p className="mt-2 text-gray-500">
                    View premium founder payments and transaction history.
                </p>
            </div>

            {/* Table */}
            <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
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
                                    Date
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(
                                (transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b last:border-none"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
                                                    <CreditCard
                                                        size={
                                                            18
                                                        }
                                                        className="text-brand-primary"
                                                    />
                                                </div>

                                                <span className="font-medium">
                                                    {
                                                        transaction.user
                                                    }
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 font-semibold">
                                            $
                                            {
                                                transaction.amount
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {
                                                transaction.date
                                            }
                                        </td>

                                        <td className="px-6 py-4">
                                            {transaction.status ===
                                                "Paid" ? (
                                                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                    <CheckCircle
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                    <Clock3
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}