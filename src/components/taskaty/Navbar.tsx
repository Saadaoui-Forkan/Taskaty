"use client";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav
      className={`bg-gray-100 dark:bg-dustyGray p-4 flex justify-between items-center flex-wrap shadow-md`}
    >
      {/* Logo */}
      <div className="text-xl font-bold">
        <h1 className="font-protest text-royalPurple dark:text-white">Taskaty</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-8">
        {/* Notification Icon */}
        <div className="relative">
          <FiBell className="text-gray-600 dark:text-white text-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-all" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
            3
          </span>
        </div>

        {/* Username and Logout Button */}
        <div className="flex items-center space-x-4">
          <h1 className="font-semibold dark:text-white">Username</h1>
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline transition-all"
            // onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
