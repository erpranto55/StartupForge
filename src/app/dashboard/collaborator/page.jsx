import {
    BriefcaseBusiness,
    Clock3,
    CheckCircle,
} from "lucide-react";

export default function CollaboratorDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                Collaborator Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Track your applications and startup opportunities.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {/* Total Applications */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BriefcaseBusiness className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        12
                    </h3>

                    <p className="text-gray-500">
                        Total Applications
                    </p>
                </div>

                {/* Pending */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Clock3 className="text-yellow-500" />

                    <h3 className="mt-4 text-3xl font-bold">
                        5
                    </h3>

                    <p className="text-gray-500">
                        Pending Reviews
                    </p>
                </div>

                {/* Accepted */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <CheckCircle className="text-green-600" />

                    <h3 className="mt-4 text-3xl font-bold">
                        3
                    </h3>

                    <p className="text-gray-500">
                        Accepted Applications
                    </p>
                </div>
            </div>
        </div>
    );
}