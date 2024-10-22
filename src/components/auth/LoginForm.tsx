"use client";
import { AppContext } from "@/context/AppContext";
import { ErrorResponse } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Toast from "../toast";

const LoginForm = () => {
  const t = useTranslations('Auth')
  const router = useRouter()
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
      await axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_DOMAIN}/login`, {
        email,
        password,
      });
      router.replace("/taskaties");
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
        {/* Email Field */}
        <div className="field-wrap mb-4">
          <label className="text-white dark:text-coolGray">
            {t('email')}<span className="req text-rubyRed">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            className="w-full p-2 border border-coolGray dark:border-white 
                   bg-white dark:bg-slateGray text-slateGray dark:text-white 
                   rounded-lg focus:outline-none focus:border-leafGreen"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="field-wrap mb-6">
          <label className="text-white dark:text-coolGray">
            {t('password')}<span className="req text-rubyRed">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            className="w-full p-2 border border-coolGray dark:border-white 
                   bg-white dark:bg-slateGray text-slateGray dark:text-white 
                   rounded-lg focus:outline-none focus:border-leafGreen"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-rubyRed mb-4">* {t('required')}</p>
        {/* Login Button */}
        <button
          className="button button-block w-full py-2 text-lg font-semibold 
                 text-white bg-leafGreen hover:bg-coralRed 
                 rounded-lg transition-all duration-300"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white inline-block"></span>
          ) : (
            t("login")
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
