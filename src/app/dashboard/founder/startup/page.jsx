import Link from "next/link";
import { PlusCircle, Rocket } from "lucide-react";

export default function StartupPage() {
    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-brand-ink">
                        My Startup
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create and manage your startup profile.
                    </p>
                </div>

                <Link
                    href="/dashboard/founder/startup/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                >
                    <PlusCircle size={18} />
                    Create Startup
                </Link>
            </div>

            {/* Empty State */}
            <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
                        <Rocket
                            size={40}
                            className="text-brand-primary"
                        />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-brand-ink">
                        No Startup Found
                    </h2>

                    <p className="mt-3 max-w-md text-gray-500">
                        You haven&apos;t created a startup yet.
                        Create your startup profile and start
                        recruiting talented collaborators.
                    </p>

                    <Link
                        href="/dashboard/founder/startup/create"
                        className="mt-6 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Create Your First Startup
                    </Link>
                </div>
            </div>
        </div>
    );
}