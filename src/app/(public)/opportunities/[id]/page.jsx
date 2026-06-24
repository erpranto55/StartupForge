import Link from "next/link";
import {
    ArrowLeft,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Clock3,
    Globe,
} from "lucide-react";

export default function OpportunityDetailsPage() {
    const opportunity = {
        id: 1,
        roleTitle: "Frontend Developer",
        startupName: "AI Nexus",
        description:
            "We are looking for a passionate Frontend Developer to help build modern web applications using React and Next.js.",
        requiredSkills: [
            "React",
            "Next.js",
            "Tailwind CSS",
        ],
        workType: "Remote",
        commitmentLevel: "Part Time",
        deadline: "2026-08-15",
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back */}
            <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 text-brand-primary"
            >
                <ArrowLeft size={18} />
                Back to Opportunities
            </Link>

            {/* Hero */}
            <div className="mt-6 rounded-4xl bg-[#15173D] p-10 text-white">
               

                <h1 className="mt-6 text-5xl font-black">
                    {opportunity.roleTitle}
                </h1>

                <p className="mt-3 text-white/70">
                    {opportunity.startupName}
                </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
                {/* Main */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Role Description
                    </h2>

                    <p className="mt-5 leading-8 text-gray-600">
                        {opportunity.description}
                    </p>

                    <h2 className="mt-10 text-2xl font-bold text-brand-ink">
                        Required Skills
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {opportunity.requiredSkills.map(
                            (skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-brand-primary/10 px-4 py-2 text-brand-primary"
                                >
                                    {skill}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Opportunity Info
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div className="flex items-center gap-3">
                            <Building2 size={18} />

                            <span>
                                {opportunity.startupName}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Globe size={18} />

                            <span>
                                {opportunity.workType}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock3 size={18} />

                            <span>
                                {
                                    opportunity.commitmentLevel
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <CalendarDays size={18} />

                            <span>
                                Deadline:
                                {" "}
                                {
                                    opportunity.deadline
                                }
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/opportunities/${opportunity.id}/apply`}
                        className="mt-8 flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}