"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Toast from "../toast";
import { AppContext } from "@/context/AppContext";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/utils/types";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const t = useTranslations("Auth");
  const locale = useLocale()
  const router = useRouter();
  const context = useContext(AppContext);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { alert, setAlert, setUsername } = context;

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Validation
    if (first_name === "") {
      setAlert({ alertText: t('required_first_name'), type: "error" });
      setLoading(false);
      return;
    }
    if (last_name === "") {
      setAlert({ alertText: t('required_last_name'), type: "error" });
      setLoading(false);
      return;
    }
    if (email === "") {
      setAlert({ alertText: t('required_email'), type: "error" });
      setLoading(false);
      return;
    }
    if (password === "") {
      setAlert({ alertText: t('required_password'), type: "error" });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_DOMAIN}/register`, {
        last_name,
        first_name,
        email,
        password,
      });
      router.push(`${locale}/taskaties`);
      setUsername(first_name)
      setLoading(false);
      router.refresh();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log(axiosError);
      const errorMessage =
        axiosError.response?.data?.message || "An error occurred";
      setAlert({ alertText: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (alert.type !== "") {
      setTimeout(() => {
        setAlert({ alertText: "", type: "" });
      }, 5000);
    }
  }, [alert]);

  return (
    <div>
      {alert.type && <Toast alertText={alert.alertText} type={alert.type} />}
      <form onSubmit={submitFormHandler}>
        {/* First Name & Last Name Fields */}
        <div className="flex justify-between">
          <div className="w-1/2 mx-2 mb-4">
            <label className="text-white dark:text-coolGray">
              {t("first_name")}
              <span className="text-rubyRed">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              className="w-full p-2 border border-coolGray dark:border-white 
                      bg-white dark:bg-slateGray text-slateGray dark:text-white 
                        rounded-lg focus:outline-none"
            />
          </div>

          <div className="w-1/2 mx-2 mb-4">
            <label className="text-white dark:text-coolGray">
              {t("last_name")}
              <span className="text-rubyRed">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              className={`w-full p-2 border border-coolGray dark:border-white 
                      bg-white dark:bg-slateGray text-slateGray dark:text-white 
                        rounded-lg focus:outline-none focus:border-leafGreen`}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="text-white dark:text-coolGray">
            {t("email")}
            <span className="text-rubyRed">*</span>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border border-coolGray dark:border-white 
                    bg-white dark:bg-slateGray text-slateGray dark:text-white 
                      rounded-lg focus:outline-none focus:border-leafGreen`}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="text-white dark:text-coolGray">
            {t("password")}
            <span className="text-rubyRed">*</span>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border border-coolGray dark:border-white 
                    bg-white dark:bg-slateGray text-slateGray dark:text-white 
                      rounded-lg focus:outline-none focus:border-leafGreen`}
          />
        </div>
        <p className="text-rubyRed mb-4">* {t("required")}</p>
        {/* Register Button */}
        <button
          type="submit"
          className="button button-block w-full py-2 text-lg font-semibold 
                  text-white bg-leafGreen hover:bg-coralRed 
                    rounded-lg transition-all duration-300"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white inline-block"></span>
          ) : (
            t("register")
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
