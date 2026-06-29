import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Edit2, Trash2, Building2, Plus } from "lucide-react";
import { updateProperty } from "@/lib/actions/property";
import Link from "next/link";

export default function BookingTable({ properties }) {
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

  const handleApprove = async (id) => {
    await updateProperty(id, { status: "Approved" });
  };

  const handleReject = async (id) => {
    await updateProperty(id, { status: "Rejected" });
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 border border-neutral-800/60 rounded-xl bg-[#111115]/20 backdrop-blur-sm space-y-5">
        <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-full shadow-inner">
          <Building2 className="w-10 h-10" />
        </div>
        <div className="space-y-1 text-center max-w-sm">
          <h3 className="text-base font-semibold text-neutral-200">
            No Properties Listed Yet
          </h3>
        </div>
        <Link
          href="/dashboard/owner/myproperties/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors duration-150 shadow-lg shadow-indigo-600/10"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Your First Listing
        </Link>
      </div>
    );
  }

  return (
    <Table aria-label="Company jobs management table" className="rounded-lg">
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
              Rent
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column
              defaultWidth="1fr"
              id="location"
              minWidth={120}
              className="rounded-none"
            >
              User Email
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
            {properties.map((property) => {
              const propertyId = property._id?.$oid || property._id;
              return (
                <Table.Row key={propertyId} className="rounded-none">
                  <Table.Cell className="rounded-none">
                    <div className="font-medium text-default-800">
                      {property.title}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="rounded-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm capitalize font-medium">
                        {property.price}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="rounded-none">
                    <span className="text-sm text-default-600">
                      {property.userEmail}
                    </span>
                  </Table.Cell>

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

                  <Table.Cell>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Tooltip content="Edit" closeDelay={0}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            radius="full"
                          >
                            <Edit2 className="text-default-400 w-4 h-4" />
                          </Button>
                        </Tooltip>

                        <Tooltip content="Delete" closeDelay={0}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            radius="full"
                          >
                            <Trash2 className="text-default-400 w-4 h-4" />
                          </Button>
                        </Tooltip>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <Button
                          onClick={() => handleReject(propertyId)}
                          size="sm"
                          variant="bordered"
                          radius="lg"
                          className="font-medium h-8 px-3 text-xs border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Reject
                        </Button>

                        <Button
                          onClick={() => handleApprove(propertyId)}
                          size="sm"
                          variant="bordered"
                          radius="lg"
                          className="font-medium h-8 px-3 text-xs border-green-500 text-green-500 hover:bg-green-50"
                        >
                          Approve
                        </Button>
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
  );
}
