import {
    Users,
    Rocket,
    BriefcaseBusiness,
    DollarSign,
} from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-black text-brand-ink">
                Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Monitor platform activities and manage users.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {/* Users */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Users className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        1,250
                    </h3>

                    <p className="text-gray-500">
                        Total Users
                    </p>
                </div>

                {/* Startups */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <Rocket className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        320
                    </h3>

                    <p className="text-gray-500">
                        Total Startups
                    </p>
                </div>

                {/* Opportunities */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BriefcaseBusiness className="text-brand-primary" />

                    <h3 className="mt-4 text-3xl font-bold">
                        860
                    </h3>

                    <p className="text-gray-500">
                        Total Opportunities
                    </p>
                </div>

                {/* Revenue */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <DollarSign className="text-green-600" />

                    <h3 className="mt-4 text-3xl font-bold">
                        $12,500
                    </h3>

                    <p className="text-gray-500">
                        Total Revenue
                    </p>
                </div>
            </div>
        </div>
    );
}