import React from "react";
import Link from "next/link"; // Or 'react-router-dom' depending on your setup

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#111115] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-5 border border-neutral-800 rounded-xl bg-[#111115]/30 space-y-6">
        {/* Playful/Fun Ghost Icon instead of a rigid lock */}
        <div className="flex justify-center pt-2">
          <div className="text-indigo-400 animate-bounce duration-1000">
            <svg
              className="w-12 h-12 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Fun & Witty Messaging */}
        <div className="space-y-2">
          <h1 className="text-base font-semibold text-neutral-200">
            401 - Access Denied! 🛑
          </h1>
          <p className="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Nice try, hacker! But your credentials arent VIP enough to pass this
            checkpoint. Lets head back before the alarms go off.
          </p>
        </div>

        {/* Action Button matching your exact UI layout */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block w-full px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors duration-150 border border-neutral-700/50"
          >
            Abort Mission & Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
