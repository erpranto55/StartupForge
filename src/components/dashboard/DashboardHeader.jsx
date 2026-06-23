import { Bell } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-brand-ink">
                    Welcome Back
                </h1>

                <p className="text-gray-500">
                    Manage your startup activities.
                </p>
            </div>

            <button className="rounded-xl bg-brand-blush p-3">
                <Bell size={20} />
            </button>
        </div>
    );
}