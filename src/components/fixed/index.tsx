"use client"
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FiMoon, FiSun } from "react-icons/fi";

const Fixed = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${darkMode && "dark"}`}>
      <div className="relative">
        {/* Settings Button */}
        <div
          onClick={toggleDropdown}
          className="flex items-center text-rubyRed dark:text-white cursor-pointer p-3 
          bg-coolGray dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-300 
          dark:hover:bg-gray-700 z-50"
        >
          <CiSettings className="text-2xl" />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute bottom-full right-0 mb-4 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg py-2"
          >
            {/* Language Input */}
            <div className="px-4 py-2 text-gray-600 dark:text-white">
              <label className="font-bold" htmlFor="language-select">
                Select Language:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="Français">Français</option>
                <option value="Arabe">العربية</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Dark/Light mode toggle */}
            <div
              onClick={toggleDarkMode}
              className="flex items-center justify-between px-4 py-2 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              {darkMode ? <FiSun className="ml-2" /> : <FiMoon className="ml-2" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Fixed;
