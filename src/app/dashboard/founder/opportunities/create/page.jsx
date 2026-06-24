import CreateOpportunityForm from "@/components/opportunity/CreateOpportunityForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateOpportunityPage() {
    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/dashboard/founder/opportunities"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary"
                >
                    <ArrowLeft size={16} />
                    Back to Opportunities
                </Link>

                <h1 className="text-4xl font-black text-brand-ink">
                    Add Opportunity
                </h1>

                <p className="mt-2 text-gray-500">
                    Create a new opportunity and start receiving applications.
                </p>
            </div>

            <CreateOpportunityForm />
        </div>
    );
}