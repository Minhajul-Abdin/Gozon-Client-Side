"use client";

import React, { useState } from "react";
import {
  Person,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "@gravity-ui/icons";
import { updateUserRole } from "@/lib/actions/users";

export default function AdminUsersTable({ users = [] }) {
  // Modal confirmation states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null); // stores { userId, userName, newRole }
  const [isUpdating, setIsUpdating] = useState(false);

  // Helper function to format MongoDB ISO dates to 'MMM DD, YYYY'
  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.$date) return "N/A";
    const date = new Date(dateObj.$date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Safe accessor for MongoDB OID
  const getUserId = (user) => user._id?.$oid || user.id;

  // Trigger confirmation modal instead of executing directly
  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  // Execute server action if confirmed
  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    console.log(`Status change triggered for ${userId} to ${newStatus}`);
  };

  const handleDelete = async (userId) => {
    console.log(`Delete triggered for user ${userId}`);
  };

  return (
    <div className="relative w-full max-w-full group overflow-hidden">
      {/* Dynamic Background Outer Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 pointer-events-none" />

      <div className="relative w-full max-w-full bg-zinc-950/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl font-sans flex flex-col">
        {/* Scroll Containment Layer wrapper */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[800px] sm:min-w-full border-collapse text-left text-sm text-zinc-400 table-auto">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/20 text-zinc-500 font-mono text-xs uppercase tracking-wider select-none">
                <th className="py-5 px-6 font-semibold">Profile</th>
                <th className="py-5 px-6 font-semibold">Email Anchor</th>
                <th className="py-5 px-6 font-semibold">Security Clearance</th>
                <th className="py-5 px-6 font-semibold">Operational Status</th>
                <th className="py-5 px-6 font-semibold text-right">
                  System Override
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-900 bg-transparent">
              {users.map((user) => {
                const userId = getUserId(user);
                const userRole = user.userRole?.toLowerCase() || "tenant";
                const userStatus = user.status || "Active";

                return (
                  <tr
                    key={userId}
                    className="hover:bg-zinc-900/30 transition-all duration-200 ease-in-out border-b border-zinc-900/40"
                  >
                    {/* User Name + Glowing Avatar Component */}
                    <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-emerald-400 font-mono font-bold tracking-wider shadow-[inset_0_0_12px_rgba(52,211,153,0.05)]">
                          {user.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </div>
                        <span className="text-zinc-100 font-medium tracking-tight hover:text-white transition-colors">
                          {user.name || "Unknown Identity"}
                        </span>
                      </div>
                    </td>

                    {/* Email Address */}
                    <td className="py-4 px-6 text-zinc-400 font-mono text-xs whitespace-nowrap">
                      {user.email}
                    </td>

                    {/* Dynamic Contextual Roles (Owner, Tenant, Admin) */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userRole === "owner" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-amber-500/5 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                          <Briefcase width={12} height={12} />
                          Owner
                        </span>
                      ) : userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)] uppercase font-mono tracking-wider">
                          <Shield width={12} height={12} />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800">
                          <Person width={12} height={12} />
                          Tenant
                        </span>
                      )}
                    </td>

                    {/* Neon Operational Status Ring */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userStatus === "Active" ? (
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 shadow-[inset_0_0_10px_rgba(16,185,129,0.02)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-md bg-red-500/5 text-red-400 border border-red-500/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Styled Interactive Custom Override Controls */}
                    <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center justify-end gap-3 font-mono text-[11px]">
                        {userRole !== "admin" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "admin")
                            }
                            className="px-2 py-1 text-zinc-500 hover:text-white rounded hover:bg-zinc-900 transition-all duration-150"
                          >
                            + Admin
                          </button>
                        )}
                        {userRole !== "owner" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "owner")
                            }
                            className="px-2 py-1 text-zinc-500 hover:text-white rounded hover:bg-zinc-900 transition-all duration-150"
                          >
                            + Owner
                          </button>
                        )}
                        {userRole !== "tenant" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "tenant")
                            }
                            className="px-2 py-1 text-zinc-500 hover:text-white rounded hover:bg-zinc-900 transition-all duration-150"
                          >
                            + Tenant
                          </button>
                        )}

                        {/* Suspension Actions Block */}
                        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
                        {userStatus === "Active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(userId, "Suspended")
                            }
                            className="text-red-400/80 hover:text-red-400 transition-colors"
                          >
                            Suspend
                          </button>
                        ) : (
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={() =>
                                handleStatusChange(userId, "Active")
                              }
                              className="text-emerald-400/80 hover:text-emerald-400 transition-colors"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleDelete(userId)}
                              className="text-zinc-600 hover:text-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tactical Dark-Themed Pagination Row */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-900 bg-zinc-950/50 text-xs font-mono text-zinc-500 select-none w-full">
          <div>Displaying 1 - {users.length} of 12,842 Profiles</div>
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:text-zinc-300 border border-zinc-900 rounded bg-zinc-900/20 transition-colors">
              <ChevronLeft width={14} height={14} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-zinc-100 text-zinc-950 rounded font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              1
            </button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-900/60 hover:bg-zinc-900/60 rounded text-zinc-400 transition-all duration-150">
              2
            </button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-900/60 hover:bg-zinc-900/60 rounded text-zinc-400 transition-all duration-150">
              3
            </button>
            <span className="px-1 text-zinc-700">...</span>
            <button className="w-fit px-1.5 h-6 flex items-center justify-center border border-zinc-900/60 hover:bg-zinc-900/60 rounded text-zinc-400 transition-all duration-150">
              1285
            </button>
            <button className="p-1 hover:text-zinc-300 border border-zinc-900 rounded bg-zinc-900/20 transition-colors">
              <ChevronRight width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Neon Modal Overlay */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fadeIn">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

            <div className="space-y-2.5">
              <h3 className="text-base font-semibold text-zinc-100 font-mono tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                System Clearance Override
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Confirm execution to rewrite the role of{" "}
                <span className="text-emerald-400 font-medium">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span className="text-violet-400 font-mono uppercase font-bold tracking-wider">
                  {pendingChange?.newRole}
                </span>
                . Changes alter global application access arrays and data
                routing streams immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-mono font-medium">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 rounded-lg transition-all disabled:opacity-20"
              >
                Abort
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmRoleChange}
                className="px-4 py-2 text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 min-w-[80px] flex items-center justify-center border border-violet-500/30"
              >
                {isUpdating ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Execute"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
