"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function FounderAnalyticsChart({ stats }) {
    const data = [
        {
            name: "Opportunities",
            total: stats?.totalOpportunities || 0,
        },
        {
            name: "Applications",
            total: stats?.totalApplications || 0,
        },
        {
            name: "Accepted",
            total: stats?.acceptedMembers || 0,
        },
    ];

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-brand-ink">
                Startup Analytics
            </h2>

            <div className="h-85">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

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