import Link from "next/link";
import {
    BriefcaseBusiness,
    PlusCircle,
    Pencil,
    Trash2,
} from "lucide-react";

const opportunities = [
    {
        id: 1,
        role: "Frontend Developer",
        workType: "Remote",
        deadline: "2026-08-15",
        skills: ["React", "Next.js"],
    },
    {
        id: 2,
        role: "Backend Developer",
        workType: "Hybrid",
        deadline: "2026-08-25",
        skills: ["Node.js", "MongoDB"],
    },
];

export default function OpportunitiesPage() {
    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-brand-ink">
                        Manage Opportunities
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create and manage your startup opportunities.
                    </p>
                </div>

                <Link
                    href="/dashboard/founder/opportunities/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                >
                    <PlusCircle size={18} />
                    Add Opportunity
                </Link>
            </div>

            {/* Cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {opportunities.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                                    <BriefcaseBusiness
                                        size={24}
                                        className="text-brand-primary"
                                    />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold text-brand-ink">
                                    {item.role}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {item.workType}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="rounded-lg border p-2 hover:bg-gray-50">
                                    <Pencil size={18} />
                                </button>

                                <button className="rounded-lg border p-2 text-red-500 hover:bg-red-50">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="mt-5 border-t pt-4 text-sm text-gray-500">
                            Deadline: {item.deadline}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}