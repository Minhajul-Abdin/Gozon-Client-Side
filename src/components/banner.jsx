"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  };

  // Animation variants for orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-[95vh] bg-[#0B0F19] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden antialiased selection:bg-indigo-500/30">
      {/* Cinematic Ambient Glow Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-[10%] right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content Split Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 mb-16 lg:mb-20"
      >
        {/* Left Column: Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex self-center lg:self-start items-center gap-2 bg-indigo-950/50 border border-indigo-500/30 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Discover Your Next Stay
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Find Perfect Rentals <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Without The Hassle.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
          >
            Explore thousands of premium apartments, cozy houses, and luxury
            villas tailored perfectly to your lifestyle and budget parameters.
          </motion.p>
        </div>

        {/* Right Column: Premium Hero Visual Asset */}
        <motion.div
          variants={imageVariants}
          className="lg:col-span-6 w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-slate-800 relative group"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury rental property exterior"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/40 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* Floating Dynamic Search Bar Component */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.6 }}
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
    </section>
  );
}
