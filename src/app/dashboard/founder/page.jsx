import {
    BriefcaseBusiness,
    Users,
    CheckCircle,
} from "lucide-react";

export default function FounderDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                Founder Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Overview of your startup activities.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BriefcaseBusiness className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        12
                    </h3>

                    <p>Total Opportunities</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Users className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        87
                    </h3>

                    <p>Total Applications</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <CheckCircle className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        15
                    </h3>

                    <p>Accepted Members</p>
                </div>
            </div>
        </div>
    );
}