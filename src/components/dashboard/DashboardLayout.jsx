export default function DashboardLayout({
    sidebar,
    children,
}) {
    return (
        <div className="flex min-h-screen bg-brand-blush">
            {sidebar}

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}