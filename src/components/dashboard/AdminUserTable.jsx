"use client";

import React, { useState } from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
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
  console.log(pendingChange);
  // Execute server action if confirmed
  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;
      const update = await updateUserRole(pendingChange);
      console.log(update);
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
        <Table
          aria-label="User Management Table"
          className="rounded-xl overflow-hidden"
        >
          <Table.ResizableContainer>
            <Table.Content className="min-w-[1100px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  id="profile"
                  defaultWidth="2fr"
                  minWidth={220}
                >
                  Profile
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="email" defaultWidth="2fr" minWidth={220}>
                  Email Anchor
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="role" defaultWidth="1.2fr" minWidth={170}>
                  Security Clearance
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="actions" defaultWidth="1fr" minWidth={320}>
                  System Override
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No users found.">
                {users.map((user) => {
                  const userId = getUserId(user);
                  const userRole = user.userRole?.toLowerCase() || "tenant";
                  //const userStatus = user.status || "Active";

                  return (
                    <Table.Row key={userId}>
                      {/* Profile */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-emerald-400">
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <span className="font-medium">
                            {user.name || "Unknown Identity"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell>
                        <span className="font-mono text-xs">{user.email}</span>
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell>
                        {userRole === "owner" ? (
                          <Chip color="warning" variant="flat">
                            <Briefcase size={14} className="mr-1" />
                            Owner
                          </Chip>
                        ) : userRole === "admin" ? (
                          <Chip color="secondary" variant="flat">
                            <Shield size={14} className="mr-1" />
                            Admin
                          </Chip>
                        ) : (
                          <Chip variant="bordered">
                            <Person size={14} className="mr-1" />
                            Tenant
                          </Chip>
                        )}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex flex-wrap gap-2">
                          {userRole !== "admin" && (
                            <Button
                              size="sm"
                              variant="bordered"
                              onClick={() =>
                                initiateRoleChange(userId, user.name, "admin")
                              }
                            >
                              + Admin
                            </Button>
                          )}

                          {userRole !== "owner" && (
                            <Button
                              size="sm"
                              variant="bordered"
                              onClick={() =>
                                initiateRoleChange(userId, user.name, "owner")
                              }
                            >
                              + Owner
                            </Button>
                          )}

                          {userRole !== "tenant" && (
                            <Button
                              size="sm"
                              variant="bordered"
                              onClick={() =>
                                initiateRoleChange(userId, user.name, "tenant")
                              }
                            >
                              + Tenant
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>

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
