"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTranslations } from "next-intl";

const Auth = () => {
  const t = useTranslations('Auth')
  const [activeTab, setActiveTab] = useState<string>("register");
  return (
    <div className="bg-royalPurple dark:bg-slateGray p-8 rounded-lg shadow-md max-w-md w-full mx-auto mt-10 transition-all duration-300">
      <ul className="flex justify-between mb-6 bg-coolGray dark:bg-slateGray">
        <li className="flex-grow">
          <button
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "register"
                ? "bg-coolGray text-dustyGray dark:bg-leafGreen dark:text-white cursor-not-allowed"
                : "bg-slateGray text-coolGray dark:bg-coralRed dark:text-white"
            }`}
            onClick={() => setActiveTab("register")}
          >
            {t('register')}
          </button>
        </li>

        {/* Divider between Register and Log In */}
        <li className="w-1 bg-dustyGray dark:bg-white"></li>

        <li className="flex-grow">
          <button
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "login"
                ? "bg-coolGray text-dustyGray dark:bg-leafGreen dark:text-white cursor-not-allowed"
                : "bg-slateGray text-coolGray dark:bg-coralRed dark:text-white"
            }`}
            onClick={() => setActiveTab("login")}
          >
            {t('login')}
          </button>
        </li>
      </ul>

      <div className="w-full">
        {activeTab === "register" && (
          <RegisterForm />
        )}
        {activeTab === "login" && (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default Auth;
