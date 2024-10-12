"use client";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FiMoon, FiSun } from "react-icons/fi";

const Fixed = () => {
  const { darkMode, toggleMode } = useContext(ThemeContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  console.log(darkMode);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Settings Button */}
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-center p-3 bg-coolGray dark:bg-gray-800 
                 text-rubyRed dark:text-white rounded-full shadow-lg cursor-pointer 
                 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <CiSettings className="text-2xl" />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute bottom-full right-0 mb-4 w-48 bg-white dark:bg-gray-700 
                   border border-coolGray dark:border-gray-600 rounded-lg shadow-lg 
                   py-2 transition-all duration-300"
          >
            {/* Language Selection */}
            <div className="px-4 py-2 text-dustyGray dark:text-white">
              <label className="font-bold" htmlFor="language-select">
                Select Language:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="mt-1 block w-full border border-coolGray dark:border-gray-600 
                       bg-white dark:bg-slateGray text-slateGray dark:text-white 
                       rounded-lg focus:outline-none focus:ring focus:ring-leafGreen"
              >
                <option value="Français">Français</option>
                <option value="Arabe">العربية</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Dark/Light Mode Toggle */}
            <div
              onClick={toggleMode}
              className="flex items-center justify-between px-4 py-2 text-dustyGray 
                     dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 
                     cursor-pointer transition-all duration-300"
            >
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              {darkMode ? (
                <FiSun className="ml-2" />
              ) : (
                <FiMoon className="ml-2" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixed;
