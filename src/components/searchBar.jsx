"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Magnifier, MapPin, House, ChevronDown } from "@gravity-ui/icons";
const SearchBar = () => {
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

  useEffect(() => {
    const sp = URLSearchParams();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchData = {
      location,
      propertyType,
      minPrice,
      maxPrice,
    };
    console.log("Searching for:", searchData);
  };

  return (
    <div className="pb-15">
      {/* Location Input Field */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.6,
          }}
          className="max-w-6xl w-full z-20"
        >
          <form
            onSubmit={handleSearch}
            className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl lg:rounded-full shadow-2xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-4 items-end transition-all"
          >
            {/* Location Input Field */}
            <div className="lg:col-span-3 flex flex-col space-y-2">
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-3">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-4 text-slate-500 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-slate-950/50 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-full text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Property Type Dropdown Selection */}
            <div className="lg:col-span-3 flex flex-col space-y-2">
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-3">
                Property Type
              </label>
              <div className="relative flex items-center">
                <House className="absolute left-4 text-slate-500 w-4 h-4 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-12 pl-11 pr-10 bg-slate-950/50 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-full text-sm text-slate-200 outline-none transition-all appearance-none cursor-pointer shadow-inner"
                >
                  <option
                    value=""
                    disabled
                    hidden
                    className="bg-slate-900 text-slate-500"
                  >
                    Select type
                  </option>
                  {propertyOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-slate-900 text-slate-300"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 text-slate-500 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Budget Input Minimum Price */}
            <div className="lg:col-span-2 flex flex-col space-y-2">
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-3">
                Min Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-500 text-sm font-medium pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full h-12 pl-8 pr-4 bg-slate-950/50 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-full text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Budget Input Maximum Price */}
            <div className="lg:col-span-2 flex flex-col space-y-2">
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-3">
                Max Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-500 text-sm font-medium pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-12 pl-8 pr-4 bg-slate-950/50 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-full text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Action Button Trigger */}
            <div className="lg:col-span-2 w-full">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-full shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.45)] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                <Magnifier className="w-4 h-4" />
                <span>Search</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchBar;
