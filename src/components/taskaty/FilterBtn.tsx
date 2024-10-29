"use client";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const FilterSidebar = () => {
  const t = useTranslations("Filters")
  const [isOpen, setIsOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [status, setStatus] = useState<string>("")
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleFilter = () => {
    try {
      const queryParams = new URLSearchParams();

      if (status) queryParams.append("status", status);
      if (from) queryParams.append("from", from);
      if (to) queryParams.append("to", to);

      const queryString = queryParams.toString();
      const path = queryString ? `/taskaties/filter?${queryString}` : `/taskaties`;

      router.push(path);
    } catch (error) {
      console.error("Error while filtering:", error);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsRTL(document.dir === 'rtl');
    }
  }, []);
  return (
    <div className="z-[100]">
      <div
          className={`w-64 p-4 border-r dark:border-gray-700 bg-white dark:bg-gray-900 
            h-screen fixed top-16 left-0 transition-transform duration-300 shadow-lg 
            ${isOpen ? "" : "-translate-x-full"}`}
      >

        <button
          onClick={handleClose}
          className={`absolute top-4 transition-all 
            ${isRTL  ? 'left-4' : 'right-4'}`}
        >
          <IoIosCloseCircle className="text-2xl bg-white text-red-500 w-full h-full rounded-full" />
        </button>

        <h1 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          {t("filters")}
        </h1>

        <div className="mb-4">
          <select
            name="status"
            className="w-full p-1 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">
              {t('select_status')}
            </option>
            <option value="NotStarted">{t('statuses.not_started')}</option>
            <option value="InProgress">{t('statuses.in_progress')}</option>
            <option value="Completed">{t('statuses.completed')}</option>
          </select>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {t('date_range')}
          </h2>
          <div className="mb-2">
            <label htmlFor="start-date" className="block text-gray-700 dark:text-gray-300">
              {t('from')}
            </label>
            <input
              type="date"
              id="start-date"
              className="w-full p-1 border rounded-md bg-white dark:bg-gray-700 dark:text-white 
              focus:outline-none"
              value={from || ""}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-gray-700 dark:text-gray-300">
              {t('to')}
            </label>
            <input
              type="date"
              id="end-date"
              className="w-full p-1 border rounded-md bg-white dark:bg-gray-700 dark:text-white 
              focus:outline-none"
              value={to || ""}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="w-full py-2 px-4 rounded-md 
            text-white bg-leafGreen hover:bg-green-600 
            dark:bg-green-700 dark:hover:bg-green-600 
            transition-all duration-300 shadow-md 
            focus:outline-none focus:ring-2 focus:ring-leafGreen"
        >
          {t('filter_tasks')}
        </button>
      </div>

      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed top-16 left-4 p-2 bg-royalPurple text-white 
          rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        >
          <FiFilter className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
