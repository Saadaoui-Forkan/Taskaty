"use client";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="z-50">
      {/* Sidebar */}
      <div
        className={`w-64 p-4 border-r bg-coolGray h-screen fixed top-16 left-0 transform 
            transition-transform duration-300 shadow-lg ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-rubyRed hover:text-coralRed transition-all"
        >
          <IoIosCloseCircle className="text-4xl" />
        </button>

        {/* Filters Title */}
        <h1 className="text-lg font-bold mb-4 text-white">Filters</h1>

        {/* Status Filter */}
        <div className="mb-4">
          <h2 className="font-semibold text-dustyGray">Status</h2>
          {["Completed", "In Progress", "Not Started"].map((status, idx) => (
            <div className="flex items-center mb-2" key={idx}>
              <input
                type="checkbox"
                id={status.toLowerCase().replace(" ", "-")}
                className="accent-leafGreen"
              />
              <label
                htmlFor={status.toLowerCase().replace(" ", "-")}
                className="ml-2 text-white"
              >
                {status}
              </label>
            </div>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="mb-4">
          <h2 className="font-semibold text-dustyGray">Date Range</h2>
          <div className="mb-2">
            <label htmlFor="start-date" className="block text-white">
              From:
            </label>
            <input
              type="date"
              id="start-date"
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring focus:ring-leafGreen"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-white">
              To:
            </label>
            <input
              type="date"
              id="end-date"
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring focus:ring-leafGreen"
            />
          </div>
        </div>
      </div>

      {/* Open Sidebar Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed top-16 left-4 p-3 bg-royalPurple text-white rounded-full shadow-lg 
             hover:bg-leafGreen transition-all duration-300"
        >
          <FiFilter className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
