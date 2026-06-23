import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
    children,
}) {
    return (
        <div className="min-h-screen bg-brand-blush">
            <div className="container mx-auto flex">
                <DashboardSidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}