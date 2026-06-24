import {
    CheckCircle,
    XCircle,
    Globe,
    Mail,
} from "lucide-react";

const applications = [
    {
        id: 1,
        applicantName: "John Doe",
        applicantEmail: "john@example.com",
        role: "Frontend Developer",
        portfolio:
            "https://portfolio-john.com",
        motivation:
            "I have 2 years of React experience and would love to contribute to this startup.",
        status: "Pending",
    },
    {
        id: 2,
        applicantName: "Sarah Smith",
        applicantEmail: "sarah@example.com",
        role: "UI/UX Designer",
        portfolio:
            "https://portfolio-sarah.com",
        motivation:
            "Passionate about creating user experiences and building startup products.",
        status: "Pending",
    },
];

export default function ApplicationsPage() {
    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-brand-ink">
                    Applications
                </h1>

                <p className="mt-2 text-gray-500">
                    Review applicants for your
                    startup opportunities.
                </p>
            </div>

            {/* Cards */}
            <div className="mt-10 space-y-6">
                {applications.map(
                    (application) => (
                        <div
                            key={application.id}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-brand-ink">
                                        {
                                            application.applicantName
                                        }
                                    </h2>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail
                                                size={
                                                    16
                                                }
                                            />

                                            {
                                                application.applicantEmail
                                            }
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Globe
                                                size={
                                                    16
                                                }
                                            />

                                            <a
                                                href={
                                                    application.portfolio
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-brand-primary"
                                            >
                                                View
                                                Portfolio
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-semibold text-brand-ink">
                                            Applied
                                            For
                                        </p>

                                        <p className="text-gray-600">
                                            {
                                                application.role
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <p className="font-semibold text-brand-ink">
                                            Motivation
                                        </p>

                                        <p className="mt-2 text-gray-600">
                                            {
                                                application.motivation
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white">
                                        <CheckCircle
                                            size={
                                                18
                                            }
                                        />
                                        Accept
                                    </button>

                                    <button className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white">
                                        <XCircle
                                            size={
                                                18
                                            }
                                        />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}