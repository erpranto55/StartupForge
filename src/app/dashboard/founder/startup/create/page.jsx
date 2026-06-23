import CreateStartupForm from "@/components/startup/CreateStartupForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateStartupPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/founder/startup"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary"
                >
                    <ArrowLeft size={16} />
                    Back to My Startup
                </Link>

                <h1 className="text-4xl font-black text-brand-ink">
                    Create Startup
                </h1>

                <p className=" text-gray-500">
                    Build your startup profile and start
                    recruiting talented collaborators.
                </p>
            </div>

            {/* Form */}
            <CreateStartupForm />
        </div>
    );
}