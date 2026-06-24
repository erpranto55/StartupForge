const applications = [
    {
        id: 1,
        startup: "AI Nexus",
        role: "Frontend Developer",
        appliedDate: "2026-08-01",
        status: "Pending",
    },
    {
        id: 2,
        startup: "FinPilot",
        role: "Backend Developer",
        appliedDate: "2026-08-05",
        status: "Accepted",
    },
];

export default function MyApplicationsPage() {
    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                My Applications
            </h1>

            <p className="mt-2 text-gray-500">
                Track the status of your startup applications.
            </p>

            <div className="mt-10 space-y-5">
                {applications.map((application) => (
                    <div
                        key={application.id}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-2xl font-bold text-brand-ink">
                            {application.role}
                        </h2>

                        <p className="mt-2 text-gray-500">
                            {application.startup}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-4">
                            <span className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm text-brand-primary">
                                Applied: {application.appliedDate}
                            </span>

                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
                                {application.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}