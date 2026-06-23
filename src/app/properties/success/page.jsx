import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { submitBookings } from "@/lib/actions/payment";
import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await submitBookings({
      ...metadata,
      sessionId: session_id,
      priceId: metadata?.price,
    });
    console.log(metadata);

    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Mesh Gradients to match dashboard styles */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full p-6 border border-neutral-800 rounded-xl bg-[#111115]/30 space-y-6 relative z-10 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Animated Success Check Icon */}
          <div className="flex justify-center pt-2">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full shadow-inner animate-pulse duration-[3000ms]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>

          {/* Core Notification Content */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-neutral-200 tracking-tight">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
              We appreciate your business! A confirmation email has been sent to{" "}
              <span className="text-indigo-400 font-medium break-all">
                {customerEmail}
              </span>
              .
            </p>
          </div>

          {/* Info Banner Container matching form structure */}
          <div className="text-xs text-neutral-500 bg-[#111115]/40 p-3 rounded-lg border border-neutral-800/60 max-w-xs mx-auto">
            Have questions? Contact us at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-neutral-400 hover:text-neutral-300 underline transition-colors"
            >
              orders@example.com
            </a>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/dashboard/tenant"
              className="inline-block w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-lg shadow-indigo-600/10"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="inline-block w-full px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors duration-150 border border-neutral-700/50"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
