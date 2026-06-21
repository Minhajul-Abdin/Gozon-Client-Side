import React from "react";
import { getMyproperties } from "@/lib/api/property";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2 } from "lucide-react";

const myPropertiesPage = async () => {
  const ownerId = "6a35ac40a6304812be5c61d5";
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
      <div className="p-6 max-w-7xl mx-auto space-y-4 rounded-none">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Manage All Properties
          </h2>
          <p className="text-sm text-default-500">
            View, update, and manage your current property postings.
          </p>
        </div>

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
                        color={getStatusColor(properties.status)}
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
                        <Tooltip content="Delete Job" className="rounded-none">
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
      </div>
    </div>
  );
};

export default myPropertiesPage;
