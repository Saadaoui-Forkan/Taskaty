"use client";
import { useTranslations } from "next-intl";
import { FiBell } from "react-icons/fi";
import { useContext, useEffect, useState } from "react"
import { JWTPayload } from "@/utils/types";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import axios from "axios";

interface NavBarProps {
  payload: JWTPayload | null
}

const Navbar = ({payload}: NavBarProps) => {
  const context = useContext(AppContext);
  const router = useRouter();

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { alert, setAlert } = context;
  const t = useTranslations("Logout");

  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const htmlDir = document.documentElement.getAttribute("dir") || "ltr";
    setDirection(htmlDir as "ltr" | "rtl");
  }, []);

  const handleLogout = async() => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_AUTH_API_DOMAIN}/logout`)
      router.push('/')
      router.refresh()
    } catch (error) {
      setAlert({ alertText: t('wrong'), type: "warning" })
    }
  }
  return (
    <nav
      className={`bg-gray-100 dark:bg-dustyGray p-4 flex justify-between items-center flex-wrap shadow-md`}
    >
      <div className="text-xl font-bold">
        <h1 className="font-protest text-royalPurple dark:text-white">
          Taskaty
        </h1>
      </div>

      <div
        className={`flex items-center ${
          direction === "rtl" ? "space-x-reverse space-x-2" : "space-x-3"
        }`}
      >
        
        <div className="relative mx-2 md:mx-4">
          <FiBell className="text-gray-600 dark:text-white text-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-all" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
            3
          </span>
        </div>

        <div
          className={`flex items-center ${
            direction === "rtl" ? "ml-2 md:ml-4" : "mr-2 md:mr-4"
          }`}
        >
          <h1 className="font-semibold dark:text-white">
            {payload?.first_name}
          </h1>
          <button
            onClick={handleLogout}
            className="text-blue-600 dark:text-blue-400 hover:underline transition-all mx-2"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
