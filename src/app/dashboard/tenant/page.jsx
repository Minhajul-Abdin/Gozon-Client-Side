import React from "react";
import { getMyBookings } from "@/lib/api/property";
import { Table, Chip } from "@heroui/react";
import { CalendarDays } from "lucide-react";
import { getUserSession } from "@/lib/core/session";

const tenantDashboardPage = async () => {
  const user = await getUserSession();
  const tenantId = user?.userId;
  const bookings = (await getMyBookings(tenantId)) || [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      default:
        return "danger";
    }
  };

  // Human-readable date formatter helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto space-y-4 rounded-none relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Manage Your Bookings
          </h2>
          <p className="text-sm text-default-500">
            View, track, and manage your current property reservations and
            payments.
          </p>
        </div>

        {bookings.length === 0 ? (
          /* Premium Empty State Section styled to match the tactical dark theme */
          <div className="relative w-full max-w-full group overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl blur opacity-30 pointer-events-none" />
            <div className="relative w-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-zinc-950/90 border border-zinc-900 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6 text-center">
              <div className="p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]">
                <CalendarDays className="w-8 h-8 text-zinc-400" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="text-sm font-semibold font-mono text-zinc-200 uppercase tracking-wider">
                  No Bookings Found
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  You havent reserved any properties yet. Once you book a rental
                  listing, it will show up here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Table Layout restyled with tactical dark elements while keeping exact structure intact */
          <div className="relative w-full max-w-full group overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 pointer-events-none" />

            <Table
              aria-label="Tenant bookings management table"
              className="relative w-full max-w-full bg-zinc-950/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl font-sans"
            >
              <Table.ResizableContainer className="w-full overflow-x-auto custom-scrollbar">
                <Table.Content className="w-full min-w-[800px] sm:min-w-full border-collapse text-left text-sm text-zinc-400 table-auto">
                  <Table.Header className="border-b border-zinc-900 bg-zinc-900/20 text-zinc-500 font-mono text-xs uppercase tracking-wider select-none rounded-none">
                    <Table.Column
                      isRowHeader
                      defaultWidth="2fr"
                      id="propertyName"
                      minWidth={200}
                      className="py-5 px-6 font-semibold rounded-none bg-transparent"
                    >
                      Property Name
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1.2fr"
                      id="bookingDate"
                      minWidth={150}
                      className="py-5 px-6 font-semibold rounded-none bg-transparent"
                    >
                      Booking Date
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1fr"
                      id="amountPaid"
                      minWidth={120}
                      className="py-5 px-6 font-semibold rounded-none bg-transparent"
                    >
                      Amount Paid
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1fr"
                      id="bookingStatus"
                      minWidth={100}
                      className="py-5 px-6 font-semibold rounded-none bg-transparent"
                    >
                      Booking Status
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1.8fr"
                      id="paymentStatus"
                      minWidth={220}
                      className="py-5 px-6 font-semibold text-right rounded-none bg-transparent"
                    >
                      Payment Status
                    </Table.Column>
                  </Table.Header>

                  <Table.Body
                    emptyContent={"No bookings found."}
                    className="divide-y divide-zinc-900 bg-transparent"
                  >
                    {bookings.map((booking) => {
                      // Exact runtime style mapping for HeroUI components matching tactical colors
                      const status = booking.status?.toLowerCase();
                      const statusColor =
                        status === "approved"
                          ? "success"
                          : status === "pending"
                            ? "warning"
                            : "danger";
                      const customBadgeClass =
                        status === "approved"
                          ? "text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide rounded-md"
                          : status === "pending"
                            ? "text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide rounded-md"
                            : "text-rose-400 bg-rose-500/5 border border-rose-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide rounded-md";

                      return (
                        <Table.Row
                          key={booking._id?.$oid || booking._id}
                          className="hover:bg-zinc-900/30 transition-all duration-200 ease-in-out border-b border-zinc-900/40 rounded-none bg-transparent"
                        >
                          {/* Property Name */}
                          <Table.Cell className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap rounded-none bg-transparent">
                            <div className="text-zinc-100 font-medium tracking-tight hover:text-white transition-colors">
                              {booking.title}
                            </div>
                          </Table.Cell>

                          {/* Formatted Booking Date */}
                          <Table.Cell className="py-4 px-6 text-zinc-400 font-light whitespace-nowrap font-mono text-xs rounded-none bg-transparent">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-mono font-light text-zinc-400">
                                {formatDate(booking.createdAt)}
                              </span>
                            </div>
                          </Table.Cell>

                          {/* Amount Paid */}
                          <Table.Cell className="py-4 px-6 text-zinc-300 font-medium whitespace-nowrap font-mono text-xs rounded-none bg-transparent">
                            <span className="text-xs font-mono font-medium text-zinc-300">
                              {booking.price}
                            </span>
                          </Table.Cell>

                          {/* Booking Status */}
                          <Table.Cell className="py-4 px-6 whitespace-nowrap rounded-none bg-transparent">
                            <Chip
                              color={statusColor}
                              size="sm"
                              variant="soft"
                              className={`${customBadgeClass} capitalize rounded-none`}
                            >
                              {booking.status || "Pending"}
                            </Chip>
                          </Table.Cell>

                          {/* Payment Status */}
                          <Table.Cell className="py-4 px-6 text-right whitespace-nowrap rounded-none bg-transparent">
                            <Chip
                              color="success"
                              size="sm"
                              variant="soft"
                              className="text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide rounded-md capitalize"
                            >
                              Paid
                            </Chip>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ResizableContainer>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default tenantDashboardPage;
