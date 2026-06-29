"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#7C3AED",
    "#2563EB",
    "#F97316",
];

export default function AdminPieChart({ stats }) {
    const data = [
        {
            name: "Users",
            value: stats?.users || 0,
        },
        {
            name: "Startups",
            value: stats?.startups || 0,
        },
        {
            name: "Opportunities",
            value: stats?.opportunities || 0,
        },
    ];

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-brand-ink">
                Platform Overview
            </h2>

            <div className="h-85">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={65}
                            outerRadius={105}
                            paddingAngle={4}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}