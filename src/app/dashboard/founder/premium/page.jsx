"use client";

import { useState } from "react";
import {
    Crown,
    CheckCircle,
    Sparkles,
} from "lucide-react";

import axios from "@/lib/axios";
import useCustomUser from "@/hooks/useCustomUser";
import { toast } from "react-toastify";

export default function PremiumPage() {
    const { customUser } = useCustomUser();

    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        try {
            setLoading(true);

            const res = await axios.post(
                "/api/payments/create-checkout-session",
                {
                    email: customUser.email,
                }
            );

            if (res.data.success) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to start payment.");
        } finally {
            setLoading(false);
        }
    };

    if (customUser?.isPremium) {
        return (
            <div className="mx-auto max-w-4xl">
                <div className="rounded-3xl bg-white p-10 shadow-sm text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                        <Crown
                            size={42}
                            className="text-yellow-600"
                        />
                    </div>

                    <h1 className="mt-6 text-4xl font-black text-brand-ink">
                        Premium Founder
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Your account is already upgraded.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl">
            {/* Header */}

            <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
                    <Sparkles
                        size={40}
                        className="text-brand-primary"
                    />
                </div>

                <h1 className="mt-6 text-5xl font-black text-brand-ink">
                    Upgrade to Premium
                </h1>

                <p className="mt-4 text-lg text-gray-500">
                    Unlock premium features and grow your startup faster.
                </p>
            </div>

            {/* Card */}

            <div className="mt-12 rounded-3xl bg-white p-10 shadow-sm">
                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Features */}

                    <div>
                        <h2 className="text-3xl font-bold text-brand-ink">
                            Premium Benefits
                        </h2>

                        <div className="mt-8 space-y-5">

                            {[
                                "Premium Founder Badge",
                                "Featured Startup Listing",
                                "Unlimited Opportunities",
                                "Priority Team Matching",
                                "Higher Startup Visibility",
                                "Future Premium Features",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle
                                        className="text-green-500"
                                    />

                                    <span className="text-lg">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing */}

                    <div className="rounded-3xl bg-brand-primary p-10 text-center text-white">
                        <p className="text-xl">
                            One-Time Payment
                        </p>

                        <h2 className="mt-4 text-6xl font-black">
                            $29
                        </h2>

                        <p className="mt-3 text-white/80">
                            Lifetime Premium Founder Access
                        </p>

                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="mt-10 w-full rounded-2xl bg-white py-4 font-bold text-brand-primary transition hover:opacity-90 disabled:opacity-60"
                        >
                            {loading
                                ? "Redirecting..."
                                : "Upgrade Now"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}