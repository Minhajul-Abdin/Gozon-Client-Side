"use client";

import { Suspense } from "react";
import SigninPage from "./SigninPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
          Loading...
        </div>
      }
    >
      <SigninPage />
    </Suspense>
  );
}
