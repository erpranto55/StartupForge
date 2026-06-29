import { LoaderCircle } from "lucide-react";

export default function OpportunityLoading() {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <LoaderCircle
                className="animate-spin text-brand-primary"
                size={48}
            />
        </div>
    );
}