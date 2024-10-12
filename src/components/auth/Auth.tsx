"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("register");
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full mx-auto mt-10">
      <ul className="flex justify-between mb-6 bg-coolGray">
        <li className="flex-grow">
          <button
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "register"
                ? "bg-coolGray text-slateGray cursor-not-allowed"
                : "bg-slateGray text-coolGray"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </li>
        {/* Divider between Register and Log In */}
        <li className="w-1 bg-slateGray"></li>
        <li className="flex-grow">
          <button
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "login"
                ? "bg-coolGray text-slateGray cursor-not-allowed"
                : "bg-slateGray text-coolGray"
            } `}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
        </li>
      </ul>

      <div className="w-full">
        {" "}
        {activeTab === "register" && (
          <div>
            <h1 className="text-2xl text-center text-white mb-4">
              Sign Up for Free
            </h1>
            <RegisterForm />
          </div>
        )}
        {activeTab === "login" && (
          <div>
            <h1 className="text-2xl text-center text-white mb-4">
              Welcome Back!
            </h1>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
