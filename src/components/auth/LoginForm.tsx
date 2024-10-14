"use client";
import { useTranslations } from "next-intl";
import React from "react";

const LoginForm = () => {
  const t = useTranslations('Auth')
  return (
    <div>
      <form>
        {/* Email Field */}
        <div className="field-wrap mb-4">
          <label className="text-dustyGray dark:text-coolGray">
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
          />
        </div>

        {/* Password Field */}
        <div className="field-wrap mb-6">
          <label className="text-dustyGray dark:text-coolGray">
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
          />
        </div>

        {/* Login Button */}
        <button
          className="button button-block w-full py-2 text-lg font-semibold 
                 text-white bg-leafGreen hover:bg-coralRed 
                 rounded-lg transition-all duration-300"
        >
          {t('login')}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
