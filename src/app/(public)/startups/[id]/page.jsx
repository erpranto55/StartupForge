import Link from "next/link";
import {
    ArrowLeft,
    Rocket,
    BriefcaseBusiness,
    Users,
    ArrowRight,
} from "lucide-react";

const startup = {
    id: 1,
    startupName: "AI Nexus",
    founderName: "John Doe",
    industry: "Artificial Intelligence",
    fundingStage: "Seed",
    teamSize: 5,
    description:
        "AI Nexus is building intelligent solutions that help businesses automate repetitive tasks and improve productivity through machine learning.",
};

const opportunities = [
    {
        id: 1,
        role: "Frontend Developer",
        skills: ["React", "Next.js"],
    },
    {
        id: 2,
        role: "Backend Developer",
        skills: ["Node.js", "MongoDB"],
    },
];

export default function StartupDetailsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back Button */}
            <Link
                href="/startups"
                className="inline-flex items-center gap-2 text-brand-primary"
            >
                <ArrowLeft size={18} />
                Back to Startups
            </Link>

            {/* Banner */}
            <div className="mt-6 rounded-4xl bg-[#15173D] p-10 text-white">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="mt-6 text-5xl font-black">
                            {startup.startupName}
                        </h1>

                        <p className="mt-3 text-white/70">
                            Founded by {startup.founderName}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/10 px-4 py-2">
                            {startup.industry}
                        </span>

                        <span className="rounded-full bg-white/10 px-4 py-2">
                            {startup.fundingStage}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        About Startup
                    </h2>

                    <p className="mt-5 leading-8 text-gray-600">
                        {startup.description}
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-brand-ink">
                        Startup Info
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <p className="text-sm text-gray-500">
                                Industry
                            </p>

                            <p className="font-semibold">
                                {startup.industry}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Funding Stage
                            </p>

                            <p className="font-semibold">
                                {startup.fundingStage}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Team Needed
                            </p>

                            <div className="flex items-center gap-2 font-semibold">
                                <Users size={16} />
                                {startup.teamSize}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open Opportunities */}
            <div className="mt-12">
                <h2 className="text-3xl font-black text-brand-ink">
                    Open Opportunities
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {opportunities.map((opportunity) => (
                        <div
                            key={opportunity.id}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                                <BriefcaseBusiness className="text-brand-primary" />
                            </div>

                            <h3 className="mt-4 text-xl font-bold">
                                {opportunity.role}
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {opportunity.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/opportunities/${opportunity.id}`}
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary"
                            >
                                View Opportunity
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}