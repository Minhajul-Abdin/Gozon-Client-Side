"use client";

import { Suspense } from "react";
import SignupPage from "./SignupPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
          Loading...
        </div>
      }
    >
      <SignupPage />
    </Suspense>
  );
}
