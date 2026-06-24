import React from "react";
import {
  Mail,
  Calendar,
  Sparkles,
  Activity,
  ShieldCheck,
  User,
  RefreshCw,
} from "lucide-react";

export default function UserProfileComponent({ user }) {
  // Graceful fallback to avoid runtime crashes if user data is still fetching
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center font-medium">
        Loading workspace profile...
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background Glow Design Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Structural Wrapper */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-start">
        {/* LEFT PROFILE HERO CARD (4 Columns) */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center text-center justify-between relative overflow-hidden shadow-2xl group min-h-[360px]">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="w-full pt-4 flex flex-col items-center">
            {/* Animated Profile Ring */}
            <div className="relative mb-5">
              <div className="absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500" />
              <img
                src={user.image}
                alt={user.name || "User profile"}
                className="w-28 h-28 rounded-full object-cover relative border-4 border-zinc-900 bg-zinc-800 shadow-xl"
              />
              <div className="absolute bottom-0 right-1 bg-zinc-950 p-1.5 rounded-full border border-zinc-800 shadow-lg text-amber-400">
                <Sparkles className="w-4 h-4 fill-amber-400" />
              </div>
            </div>

            {/* User Meta Title */}
            <h2 className="text-2xl font-black tracking-tight text-white capitalize break-words w-full px-2">
              {user.name}
            </h2>

            {user.role && (
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Activity className="w-3 h-3" />
                {user.role}
              </span>
            )}
          </div>

          {/* Quick Info Footer Tag */}
          <div className="w-full mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified Platform Account
          </div>
        </div>

        {/* RIGHT DASHBOARD CONTENT (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col space-y-4 w-full">
          {/* Primary Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <div className="flex items-center space-x-4 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-zinc-700/80 transition-colors">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/10">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-zinc-200 truncate mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Calendar Card */}
            <div className="flex items-center space-x-4 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-zinc-700/80 transition-colors">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/10">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  Member Since
                </p>
                <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Account Details Panel (Featuring Name and Updated At) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-black tracking-widest text-zinc-400 uppercase">
              Identity & System Audit
            </h3>

            <div className="divide-y divide-zinc-800/60 text-sm">
              {/* Account Full Name Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 first:pt-0 last:pb-0 gap-1 sm:gap-4">
                <span className="text-zinc-500 font-medium flex items-center gap-2 text-xs uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-zinc-600" /> Account Name
                </span>
                <span className="font-semibold text-zinc-200 capitalize truncate max-w-md">
                  {user.name}
                </span>
              </div>

              {/* Updated At Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 first:pt-0 last:pb-0 gap-1 sm:gap-4">
                <span className="text-zinc-500 font-medium flex items-center gap-2 text-xs uppercase tracking-wider">
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-600" /> Last
                  Updated
                </span>
                <span className="font-semibold text-zinc-300">
                  {formatDate(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
