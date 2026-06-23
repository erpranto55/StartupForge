import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <section className="min-h-screen bg-brand-blush">
            <div className="container mx-auto px-4 py-12">
                <div className="grid min-h-[85vh] overflow-hidden rounded-4xl bg-white shadow-2xl lg:grid-cols-2">
                    {/* Left Side */}
                    <div className="relative hidden overflow-hidden bg-[#15173D] p-12 text-white lg:block">
                        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-brand-primary/30 blur-[120px]" />
                        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#E491C9]/20 blur-[120px]" />

                        <div className="relative z-10">
                            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">
                                Welcome Back
                            </span>

                            <h1 className="mt-8 text-5xl font-black leading-tight">
                                Continue Building
                                <span className="block text-[#E491C9]">
                                    The Future
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-lg text-white/70">
                                Access your startup dashboard, manage
                                opportunities, review applications,
                                and grow your network.
                            </p>

                            <div className="mt-12 space-y-6">
                                <div>
                                    <h3 className="text-3xl font-bold">
                                        500+
                                    </h3>
                                    <p className="text-white/60">
                                        Active Startups
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold">
                                        2K+
                                    </h3>
                                    <p className="text-white/60">
                                        Collaborators
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold">
                                        1K+
                                    </h3>
                                    <p className="text-white/60">
                                        Opportunities
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center justify-center p-6 md:p-12">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}