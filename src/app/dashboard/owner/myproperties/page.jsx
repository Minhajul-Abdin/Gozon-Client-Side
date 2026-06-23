import React from "react";
import { getMyproperties } from "@/lib/api/property";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2, Building2, Plus } from "lucide-react"; // Added Plus icon
import { getUserSession } from "@/lib/core/session";
import Link from "next/link"; // Added Link component for navigation

const myPropertiesPage = async () => {
  const user = await getUserSession();
  const ownerId = user?.id;
  console.log(ownerId);
  const properties = (await getMyproperties(ownerId)) || [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "danger";
      default:
        return "warning";
    }
  };

  console.log("this is property data: ", properties);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto space-y-4 rounded-none relative z-10">
        {/* Header Layout wrapped to support the actions block cleanly */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Manage All Properties
            </h2>
            <p className="text-sm text-default-500">
              View, update, and manage your current property postings.
            </p>
          </div>

          {/* Action Link button aligned perfectly to match your review/unauthorized design lines */}
          <div>
            <Link
              href="/dashboard/owner/myproperties/new" // Update this line to match your actual route
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors duration-150 border border-neutral-700/50"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </Link>
          </div>
        </div>

        {properties.length === 0 ? (
          /* Premium Empty State Section with Add Link integrated internally as well */
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 border border-neutral-800/60 rounded-xl bg-[#111115]/20 backdrop-blur-sm space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:border-neutral-700/40">
            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-full shadow-inner animate-pulse duration-[3000ms]">
              <Building2 className="w-10 h-10" />
            </div>
            <div className="space-y-1 text-center max-w-sm">
              <h3 className="text-base font-semibold text-neutral-200">
                No Properties Listed Yet
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Your portfolio looks a bit empty. Once you add real estate
                listings, they will show up here for you to manage.
              </p>
            </div>

            {/* Added a dynamic secondary CTA right inside the empty panel */}
            <Link
              href="/dashboard/owner/myproperties/new" // Update this line to match your actual route
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors duration-150 shadow-lg shadow-indigo-600/10"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          /* Table Layout */
          <Table
            aria-label="Company jobs management table"
            className="rounded-lg"
          >
            <Table.ResizableContainer className="rounded-lg">
              <Table.Content className="min-w-[800px] rounded-lg">
                <Table.Header className="rounded-none">
                  <Table.Column
                    isRowHeader
                    defaultWidth="2fr"
                    id="jobTitle"
                    minWidth={200}
                    className="rounded-none"
                  >
                    Property Title
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.2fr"
                    id="typeCategory"
                    minWidth={150}
                    className="rounded-none"
                  >
                    Rent / Category
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1fr"
                    id="location"
                    minWidth={120}
                    className="rounded-none"
                  >
                    Location
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1fr"
                    id="status"
                    minWidth={100}
                    className="rounded-none"
                  >
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.8fr"
                    id="actions"
                    minWidth={220}
                    className="rounded-none"
                  >
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body emptyContent={"No jobs found for this company."}>
                  {properties.map((property) => (
                    <Table.Row
                      key={property._id?.$oid || property._id}
                      className="rounded-none"
                    >
                      {/* Job Title */}
                      <Table.Cell className="rounded-none">
                        <div className="font-medium text-default-800">
                          {property.propertyTitle}
                        </div>
                      </Table.Cell>

                      {/* Type / Category */}
                      <Table.Cell className="rounded-none">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm capitalize font-medium">
                            {property.rentPrice}
                          </span>
                          <span className="text-xs text-default-400 capitalize">
                            {property.propertyType}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Location */}
                      <Table.Cell className="rounded-none">
                        <span className="text-sm text-default-600">
                          {property.location}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="rounded-none">
                        <Chip
                          color={getStatusColor(property.status)}
                          size="sm"
                          variant="soft"
                          className="capitalize rounded-none"
                        >
                          {property.status || "Pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="rounded-none">
                        <div className="relative flex items-center gap-2">
                          <Tooltip
                            content="Video Details"
                            className="rounded-none"
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              aria-label="View video details"
                              className="rounded-none"
                            >
                              <Eye className="text-default-400 w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit Job" className="rounded-none">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              aria-label="Edit job"
                              className="rounded-none"
                            >
                              <Edit2 className="text-default-400 w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip
                            content="Delete Job"
                            className="rounded-none"
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              aria-label="Delete job"
                              className="rounded-none"
                            >
                              <Trash2 className="text-danger w-4 h-4" />
                            </Button>
                          </Tooltip>
                        </div>
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

export default myPropertiesPage;
