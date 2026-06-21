"use client";

import React from "react";
import { Card, Button, Tooltip } from "@heroui/react";
import { MapPin, Layers, SquareBarsVertical, QrCode } from "@gravity-ui/icons";
import Link from "next/link";

export default function PropertyCard({ property }) {
  // Fallback check to prevent errors if data hasn't loaded yet
  if (!property) return null;

  // Format currency with commas cleanly
  const formattedPrice = property.rentPrice
    ? Number(property.rentPrice).toLocaleString()
    : "0";

  return (
    <Card className="w-full max-w-[400px] border border-neutral-800 bg-[#16161a] text-white overflow-hidden shadow-xl rounded-2xl dark">
      {/* Card Header: Main Image */}
      <Card.Header className="p-0 relative aspect-[4/3] overflow-hidden">
        <img
          src={
            property.images ||
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400"
          } // Supports string or array images
          alt={property.propertyTitle}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Card.Header>

      {/* Card Content: Property Details */}
      <Card.Content className="p-5 flex flex-col gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Luxury {property.propertyType}
          </span>
          <h3 className="text-xl font-semibold text-neutral-100 mt-0.5 tracking-tight line-clamp-1">
            {property.propertyTitle}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-neutral-400 text-sm mt-2">
            <MapPin className="text-danger w-4 h-4" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Quick Specs Icons */}
        <div className="flex items-center gap-5 py-2 border-y border-neutral-800/60 text-neutral-300">
          <Tooltip content="Bedrooms" delay={300} closeDelay={0}>
            <div className="flex items-center gap-1.5 text-sm">
              <Layers className="w-4 h-4 text-neutral-400" />
              <span className="font-medium">{property.bedrooms} Beds</span>
            </div>
          </Tooltip>

          <Tooltip content="Bathrooms" delay={300} closeDelay={0}>
            <div className="flex items-center gap-1.5 text-sm">
              <SquareBarsVertical className="w-4 h-4 text-neutral-400" />
              <span className="font-medium">{property.bathrooms} Baths</span>
            </div>
          </Tooltip>

          <Tooltip content="Property Size" delay={300} closeDelay={0}>
            <div className="flex items-center gap-1.5 text-sm">
              <QrCode className="w-4 h-4 text-neutral-400" />
              <span className="font-medium">{property.propertySize} sqft</span>
            </div>
          </Tooltip>
        </div>
      </Card.Content>

      {/* Card Footer: Pricing and Call to Action */}
      <Card.Footer className="px-5 pb-5 pt-0 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-primary-400">
            ৳{formattedPrice}
          </span>
          <span className="text-xs text-neutral-400">
            /{property.rentType?.toLowerCase() || " month"}
          </span>
        </div>

        <Link
          href={`/properties/${property._id}`}
          className="bg-white p-2 hover:bg-neutral-200 text-black font-medium px-5 rounded-xl transition-colors"
          size="md"
        >
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
