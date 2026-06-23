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
          /* Premium Empty State Section */
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 border border-neutral-800/60 rounded-xl bg-[#111115]/20 backdrop-blur-sm space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:border-neutral-700/40">
            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-full shadow-inner animate-pulse duration-[3000ms]">
              <CalendarDays className="w-10 h-10" />
            </div>
            <div className="space-y-1 text-center max-w-sm">
              <h3 className="text-base font-semibold text-neutral-200">
                No Bookings Found
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                You havent reserved any properties yet. Once you book a rental
                listing, it will show up here.
              </p>
            </div>
          </div>
        ) : (
          /* Table Layout */
          <Table
            aria-label="Tenant bookings management table"
            className="rounded-lg"
          >
            <Table.ResizableContainer className="rounded-lg">
              <Table.Content className="min-w-[800px] rounded-lg">
                <Table.Header className="rounded-none">
                  <Table.Column
                    isRowHeader
                    defaultWidth="2fr"
                    id="propertyName"
                    minWidth={200}
                    className="rounded-none"
                  >
                    Property Name
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.2fr"
                    id="bookingDate"
                    minWidth={150}
                    className="rounded-none"
                  >
                    Booking Date
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1fr"
                    id="amountPaid"
                    minWidth={120}
                    className="rounded-none"
                  >
                    Amount Paid
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1fr"
                    id="bookingStatus"
                    minWidth={100}
                    className="rounded-none"
                  >
                    Booking Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.8fr"
                    id="paymentStatus"
                    minWidth={220}
                    className="rounded-none"
                  >
                    Payment Status
                  </Table.Column>
                </Table.Header>

                <Table.Body emptyContent={"No bookings found."}>
                  {bookings.map((booking) => (
                    <Table.Row
                      key={booking._id?.$oid || booking._id}
                      className="rounded-none"
                    >
                      {/* Property Name */}
                      <Table.Cell className="rounded-none">
                        <div className="font-medium text-default-800">
                          {booking.title}
                        </div>
                      </Table.Cell>

                      {/* Formatted Booking Date */}
                      <Table.Cell className="rounded-none">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {formatDate(booking.createdAt)}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Amount Paid */}
                      <Table.Cell className="rounded-none">
                        <span className="text-sm text-default-600 font-medium">
                          {booking.price}
                        </span>
                      </Table.Cell>

                      {/* Booking Status */}
                      <Table.Cell className="rounded-none">
                        <Chip
                          color={getStatusColor(booking.status)}
                          size="sm"
                          variant="soft"
                          className="capitalize rounded-none"
                        >
                          {booking.status || "Pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Payment Status */}
                      <Table.Cell className="rounded-none">
                        <Chip
                          color="success"
                          size="sm"
                          variant="soft"
                          className="capitalize rounded-none"
                        >
                          Paid
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        )}
      </div>
    </div>
  );
};

export default tenantDashboardPage;
