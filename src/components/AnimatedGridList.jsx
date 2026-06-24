"use client";

import React from "react";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property/propertyCard";

export default function AnimatedGridList({ properties }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
    >
      {properties.map((property) => (
        <motion.div
          key={property._id}
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="w-full"
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
}
