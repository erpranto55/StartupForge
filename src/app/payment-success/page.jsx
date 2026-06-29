"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/lib/axios";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    useEffect(() => {
        if (!email) return;

        const savePayment = async () => {
            try {
                await axios.post(
                    "/api/payments",
                    {
                        user_email: email,
                        amount: 29,
                        payment_status: "Paid",
                        transaction_id: crypto.randomUUID(),
                    }
                );
            } catch (err) {
                console.error(err);
            }
        };

        savePayment();
    }, [email]);

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-xl rounded-3xl border border-brand-rose/40 bg-white p-10 text-center shadow-xl">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 size={60} className="text-green-600" />
                </div>

                <h1 className="mt-6 text-4xl font-black text-brand-ink">
                    Payment Successful
                </h1>

                <p className="mt-4 text-brand-plum">
                    Congratulations!
                    <br />
                    Your StartupForge Premium Founder plan has been activated.
                </p>

                <Link
                    href="/dashboard/founder"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-plum"
                >
                    Go to Dashboard
                    <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
