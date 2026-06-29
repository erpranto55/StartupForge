"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

export default function StartupStatusChart({ stats }) {
    const data = [
        {
            status: "Approved",
            total: stats?.approvedStartups || 0,
        },
        {
            status: "Pending",
            total: stats?.pendingStartups || 0,
        },
    ];

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-brand-ink">
                Startup Status
            </h2>

            <div className="h-85">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="status" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="total"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}