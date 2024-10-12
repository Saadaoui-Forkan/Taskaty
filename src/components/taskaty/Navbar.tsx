"use client";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav
      className={`bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center flex-wrap shadow-md`}
    >
      {/* Logo */}
      <div className="text-xl font-bold">
        <h1 className="font-protest text-blue-600 dark:text-white">Taskaty</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <FiBell className="text-gray-600 dark:text-white text-2xl cursor-pointer" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex justify-center items-center leading-4">
            3
          </span>
        </div>

        {/* Username and Logout */}
        <div className="flex items-center text-gray-600 dark:text-white">
          <h1 className="mr-4">Username</h1>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
