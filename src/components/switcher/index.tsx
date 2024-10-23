"use client";
import { ChangeEvent, FormEvent, useContext, useState, useTransition } from 'react';
import { AppContext } from "@/context/AppContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { FiMoon, FiSun } from "react-icons/fi";

const Switcher = () => {
  const t = useTranslations("Fixed");
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { darkMode, toggleMode } = context

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const localActive = useLocale();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-center p-3 bg-coolGray dark:bg-gray-800 
                 text-rubyRed dark:text-white rounded-full shadow-lg cursor-pointer 
                 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <CiSettings className="text-2xl" />
        </div>

        {dropdownOpen && (
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute bottom-full right-0 mb-4 w-48 bg-white dark:bg-gray-700 
                   border border-coolGray dark:border-gray-600 rounded-lg shadow-lg 
                   py-2 transition-all duration-300"
          >
            <div className="px-4 py-2 text-dustyGray dark:text-white">
              <label className="font-bold" htmlFor="language-select">
                {t("select")}:
              </label>
              <select
                id="language-select"
                defaultValue={localActive}
                onChange={onSelectChange}
                disabled={isPending}
                className="mt-1 block w-full border border-coolGray dark:border-gray-600 
                       bg-white dark:bg-slateGray text-slateGray dark:text-white 
                       rounded-lg focus:outline-none focus:ring focus:ring-leafGreen"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <div
              onClick={toggleMode}
              className="flex items-center justify-between px-4 py-2 text-dustyGray 
                     dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 
                     cursor-pointer transition-all duration-300"
            >
              <span>{darkMode ? `${t("light")}` : `${t("dark")}`}</span>
              {darkMode ? <FiSun className="ml-2" /> : <FiMoon className="ml-2" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Switcher;
