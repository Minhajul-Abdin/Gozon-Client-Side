import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full p-5 border border-neutral-800 rounded-xl bg-[#111115]/30 space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Floating/Spinning Compass Icon */}
        <div className="flex justify-center pt-2">
          <div className="text-indigo-400 animate-spin duration-[6000ms] linear">
            <Compass className="w-12 h-12 stroke-[1.5]" />
          </div>
        </div>

        {/* Witty 404 Messaging */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-indigo-400 font-bold tracking-widest uppercase">
            Error 404
          </div>
          <h1 className="text-base font-semibold text-neutral-200">
            You've wandered off the blueprint! 🗺️
          </h1>
          <p className="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            The page you are looking for has either been moved, demolished, or
            never existed in this coordinate system. Let's get you back on
            track.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors duration-150 border border-neutral-700/50"
          >
            <Home className="w-4 h-4 text-neutral-400" />
            Back to Home Base
          </Link>
        </div>
      </div>
    </div>
  );
}
