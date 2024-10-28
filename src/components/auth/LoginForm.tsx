"use client";
import { AppContext } from "@/context/AppContext";
import { ErrorResponse } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Toast from "../toast";
import Link from "next/link";

const LoginForm = () => {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const context = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { alert, setAlert } = context;

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_DOMAIN}/login`, { email, password });
      router.push(`${locale}/taskaties`);
      router.refresh();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "An error occurred";
      setAlert({ alertText: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alert.type) {
      const timer = setTimeout(() => setAlert({ alertText: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="w-full max-w-md p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      {alert.type && <Toast alertText={alert.alertText} type={alert.type} />}
      <form onSubmit={submitFormHandler} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("password")} <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-xs mt-1">* {t("required")}</p>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
          ) : (
            t("login")
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("dontHaveAccount")}?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;