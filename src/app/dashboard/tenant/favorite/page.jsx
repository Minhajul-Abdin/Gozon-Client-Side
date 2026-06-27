import { getMyFavs } from "@/lib/api/property";
import { getUserSession } from "@/lib/core/session";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Edit2, Trash2, Building2, Plus } from "lucide-react";
import { updateProperty } from "@/lib/actions/property";
import Link from "next/link";

export default async function MyFavPage() {
  const user = await getUserSession();
  const tenantId = user?.userId;
  const fav = (await getMyFavs(tenantId)) || [];

  const handleApprove = async (id) => {
    await updateProperty(id, { status: "Approved" });
  };

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

  if (!fav || fav.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 border border-neutral-800/60 rounded-xl bg-[#111115]/20 backdrop-blur-sm space-y-5">
        <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-full shadow-inner">
          <Building2 className="w-10 h-10" />
        </div>
        <div className="space-y-1 text-center max-w-sm">
          <h3 className="text-base font-semibold text-neutral-200">
            No Favorites Found Yet
          </h3>
        </div>
        <Link
          href="/dashboard/owner/properties"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors duration-150 shadow-lg shadow-indigo-600/10"
        >
          Add Your First Favorite
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="flex flex-col gap-1 py-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Manage Your Favorite
        </h2>
        <p className="text-sm text-default-500">
          View, track, and manage your current Favorites.
        </p>
      </div>
      <div className="relative w-full max-w-full group overflow-hidden">
        {/* Cyberpunk Dynamic Neon Aura Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none" />

        <Table
          aria-label="Company jobs management table"
          className="relative w-full max-w-full bg-[#09090b]/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-xl font-sans"
        >
          <Table.ResizableContainer className="w-full overflow-x-auto custom-scrollbar">
            <Table.Content className="w-full min-w-[800px] sm:min-w-full border-collapse text-left text-sm text-zinc-400 table-auto">
              <Table.Header className="border-b border-zinc-800/80 bg-zinc-950 text-cyan-400/90 font-mono text-[11px] uppercase tracking-[0.15em] select-none rounded-none">
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="jobTitle"
                  minWidth={200}
                  className="py-5 px-6 font-bold rounded-none bg-transparent border-r border-zinc-900/40"
                >
                  Property Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1.2fr"
                  id="bookingDate"
                  minWidth={150}
                  className="py-5 px-6 font-bold rounded-none bg-transparent border-r border-zinc-900/40"
                >
                  Added Date
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column
                  defaultWidth="1.8fr"
                  id="actions"
                  minWidth={220}
                  className="py-5 px-6 font-bold rounded-none bg-transparent"
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                emptyContent={"No jobs found for this company."}
                className="divide-y divide-zinc-900 bg-transparent"
              >
                {fav.map((fav) => {
                  const favId = fav._id?.$oid || fav._id;
                  return (
                    <Table.Row
                      key={favId}
                      className="hover:bg-cyan-500/[0.02] hover:text-zinc-100 transition-all duration-150 ease-in-out border-b border-zinc-900/60 rounded-none bg-transparent group/row"
                    >
                      {/* Property Title */}
                      <Table.Cell className="py-4 px-6 font-medium text-zinc-300 whitespace-nowrap rounded-none bg-transparent">
                        <div className="text-zinc-200 font-medium tracking-wide group-hover/row:text-white group-hover/row:drop-shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-colors">
                          {fav.propertyTitle}
                        </div>
                      </Table.Cell>

                      {/* Formatted Added Date */}
                      <Table.Cell className="py-4 px-6 text-zinc-400 font-normal whitespace-nowrap font-mono text-xs rounded-none bg-transparent">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-mono font-normal text-zinc-400 group-hover/row:text-cyan-300/80 transition-colors">
                            {formatDate(fav.createdAt)}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Actions Button Cell */}
                      <Table.Cell className="py-4 px-6 rounded-none bg-transparent">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-1">
                            <Tooltip content="Delete" closeDelay={0}>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="danger"
                                radius="full"
                                className="hover:bg-rose-500/10 text-rose-400/70 hover:text-rose-400 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] border border-transparent hover:border-rose-500/20"
                              >
                                <Trash2 className="w-4 h-4 drop-shadow-[0_0_8px_currentColor]" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
}
