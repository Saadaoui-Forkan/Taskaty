"use client";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Par défaut, le sidebar est fermé

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="z-50">
        <div
            className={`w-64 p-4 border-r bg-coolGray h-screen fixed top-16 left-0 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-rubyRed hover:text-coralRed transition"
            >
            <IoIosCloseCircle className="text-4xl" />
            </button>

            <h1 className="text-lg font-bold mb-4">Filters</h1>

            <div className="mb-4">
            <h2 className="font-semibold">Status</h2>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="completed" />
                <label htmlFor="completed" className="ml-2">
                Completed
                </label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="in-progress" />
                <label htmlFor="in-progress" className="ml-2">In Progress</label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="not-started" />
                <label htmlFor="not-started" className="ml-2">Not Started</label>
            </div>
            </div>

            <div className="mb-4">
            <h2 className="font-semibold">Date Range</h2>
            <div className="mb-2">
                <label htmlFor="start-date" className="block">From:</label>
                <input
                type="date"
                id="start-date"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="end-date" className="block">To:</label>
                <input
                type="date"
                id="end-date"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            </div>
        </div>

        {!isOpen && (
            <button
            onClick={handleOpen}
            className="fixed top-16 left-4 p-3 bg-royalPurple text-white rounded-full shadow-lg hover:bg-leafGreen transition"
            >
            <FiFilter/>
            </button>
        )}
    </div>
  );
};

export default FilterSidebar;
