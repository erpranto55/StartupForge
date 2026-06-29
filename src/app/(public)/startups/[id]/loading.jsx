import { LoaderCircle } from "lucide-react";

export default function StartupLoading() {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <LoaderCircle
                    size={48}
                    className="animate-spin text-brand-primary"
                />

                <p className="text-lg font-medium">
                    Loading Startup...
                </p>
            </div>
        </div>
    );
}