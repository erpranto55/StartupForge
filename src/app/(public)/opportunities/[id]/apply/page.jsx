import ApplyOpportunityForm from "@/components/opportunity/ApplyOpportunityForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApplyPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 text-brand-primary"
            >
                <ArrowLeft size={18} />
                Back
            </Link>

            <div className="mt-6">
                <h1 className="text-4xl font-black text-brand-ink">
                    Apply To Opportunity
                </h1>

                <p className="mt-2 text-gray-500">
                    Submit your application to join the startup team.
                </p>
            </div>

            <div className="mt-8">
                <ApplyOpportunityForm />
            </div>
        </div>
    );
}