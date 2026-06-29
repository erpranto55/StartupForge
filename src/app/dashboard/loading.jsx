import { LoaderCircle } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <LoaderCircle
                    size={48}
                    className="animate-spin text-brand-primary"
                />

                <p className="text-lg font-medium text-gray-600">
                    Loading Dashboard...
                </p>
            </div>
        </div>
    );
}