"use client";

import React, { useState } from "react";
import { Magnifier, MapPin, House, ChevronDown } from "@gravity-ui/icons";

export default function Banner() {
  // State for search fields
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const propertyOptions = [
    { label: "Apartment", value: "apartment" },
    { label: "House", value: "house" },
    { label: "Villa", value: "villa" },
    { label: "Studio", value: "studio" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchData = {
      location,
      propertyType,
      minPrice,
      maxPrice,
    };
    console.log("Searching for:", searchData);
    // Add your routing/API filtering logic here
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-b from-slate-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Main Content Split Section */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 mb-12 lg:mb-16">
        {/* Left Column: Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
          <span className="inline-block self-center lg:self-start bg-indigo-50 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full tracking-wide">
            Discover Your Next Stay
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Perfect Rentals <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Without The Hassle.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Explore thousands of premium apartments, cozy houses, and luxury
            villas tailored perfectly to your lifestyle and budget parameters.
          </p>
        </div>

        {/* Right Column: Hero Visual Asset */}
        <div className="lg:col-span-6 w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl relative group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury rental property exterior"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        </div>
      </div>

      {/* Floating Dynamic Search Bar Component */}
      <div className="max-w-6xl w-full z-20">
        <form
          onSubmit={handleSearch}
          className="bg-white p-5 lg:p-6 rounded-2xl lg:rounded-full shadow-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-4 items-end"
        >
          {/* Location Input Field */}
          <div className="lg:col-span-3 flex flex-col space-y-1.5">
            <label className="text-slate-700 text-sm font-medium px-1">
              Location
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-4 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 hover:border-indigo-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Property Type Dropdown Selection */}
          <div className="lg:col-span-3 flex flex-col space-y-1.5">
            <label className="text-slate-700 text-sm font-medium px-1">
              Property Type
            </label>
            <div className="relative flex items-center">
              <House className="absolute left-4 text-slate-400 w-4 h-4 pointer-events-none" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-12 pl-11 pr-10 bg-white border border-slate-200 hover:border-indigo-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select type
                </option>
                {propertyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Budget Input Minimum Price */}
          <div className="lg:col-span-2 flex flex-col space-y-1.5">
            <label className="text-slate-700 text-sm font-medium px-1">
              Min Price
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 text-sm font-medium pointer-events-none">
                $
              </span>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-12 pl-8 pr-4 bg-white border border-slate-200 hover:border-indigo-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Budget Input Maximum Price */}
          <div className="lg:col-span-2 flex flex-col space-y-1.5">
            <label className="text-slate-700 text-sm font-medium px-1">
              Max Price
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 text-sm font-medium pointer-events-none">
                $
              </span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-12 pl-8 pr-4 bg-white border border-slate-200 hover:border-indigo-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Action Button Trigger */}
          <div className="lg:col-span-2 w-full">
            <button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md shadow-indigo-200 hover:shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Magnifier className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
