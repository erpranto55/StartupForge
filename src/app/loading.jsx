import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-blush">
            <div className="flex flex-col items-center gap-5">
                <LoaderCircle
                    size={55}
                    className="animate-spin text-brand-primary"
                />

                <h2 className="text-xl font-semibold text-brand-ink">
                    Loading...
                </h2>
            </div>
        </div>
    );
}