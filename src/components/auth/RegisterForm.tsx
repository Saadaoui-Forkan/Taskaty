"use client";
import { useTranslations } from "next-intl";
import React, { FormEvent, useContext, useState } from "react";
import Toast from "../toast";
import { AppContext } from "@/context/AppContext";

const RegisterForm = () => {
  const t = useTranslations("Auth");
  const context = useContext(AppContext);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { alert, setAlert } = context;

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(first_name, last_name, email, password)
  };

  return (
    <div>
      {/* {alert.alertText && ( */}
        <Toast alertText="warning message" type="warning" />
      
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
              className={`w-full p-2 border ${
                first_name === "" ? "border-rubyRed" : "border-coolGray"
              } dark:border-white 
                     bg-white dark:bg-slateGray text-slateGray dark:text-white 
                     rounded-lg focus:outline-none focus:border-leafGreen`}
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
              className={`w-full p-2 border ${
                first_name === "" ? "border-rubyRed" : "border-coolGray"
              } dark:border-white 
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
            className={`w-full p-2 border ${
              email === "" ? "border-rubyRed" : "border-coolGray"
            } dark:border-white 
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
            className={`w-full p-2 border ${
              password === "" ? "border-rubyRed" : "border-coolGray"
            } dark:border-white 
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
          {t("register")}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
