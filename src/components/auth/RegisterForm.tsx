"use client";
import { useTranslations } from "next-intl";
import React from "react";

const RegisterForm = () => {
  const t = useTranslations('Auth')
  return (
    <div>
      <form>
        {/* First Name & Last Name Fields */}
        <div className="flex justify-between">
          <div className="w-1/2 mx-2">
            <label className="text-dustyGray dark:text-coolGray">
              {t('first_name')}<span className="req text-rubyRed">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="off"
              className="w-full p-2 border border-coolGray dark:border-white 
                     bg-white dark:bg-slateGray text-slateGray dark:text-white 
                     rounded-lg focus:outline-none focus:border-leafGreen"
            />
          </div>

          <div className="w-1/2 mx-2">
            <label className="text-dustyGray dark:text-coolGray">
              {t('last_name')}<span className="req text-rubyRed">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="off"
              className="w-full p-2 border border-coolGray dark:border-white 
                     bg-white dark:bg-slateGray text-slateGray dark:text-white 
                     rounded-lg focus:outline-none focus:border-leafGreen"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="text-dustyGray dark:text-coolGray">
            {t('email')}<span className="text-rubyRed">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            className="w-full p-2 border border-coolGray dark:border-white 
                   bg-white dark:bg-slateGray text-slateGray dark:text-white 
                   rounded-lg focus:outline-none focus:border-leafGreen"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="text-dustyGray dark:text-coolGray">
            {t('password')}<span className="text-rubyRed">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            className="w-full p-2 border border-coolGray dark:border-white 
                   bg-white dark:bg-slateGray text-slateGray dark:text-white 
                   rounded-lg focus:outline-none focus:border-leafGreen"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="button button-block w-full py-2 text-lg font-semibold 
                 text-white bg-leafGreen hover:bg-coralRed 
                 rounded-lg transition-all duration-300"
        >
          {t('register')}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
