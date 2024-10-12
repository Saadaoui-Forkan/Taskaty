"use client";
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <form>
        {/* Email Field */}
        <div className="field-wrap mb-4">
          <label className="text-dustyGray dark:text-coolGray">
            Email Address<span className="req text-rubyRed">*</span>
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
            Password<span className="req text-rubyRed">*</span>
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

        {/* Forgot Password */}
        <p className="forgot text-right text-dustyGray dark:text-coolGray">
          <a href="#" className="text-leafGreen hover:underline">
            Forgot Password?
          </a>
        </p>

        {/* Login Button */}
        <button
          className="button button-block w-full py-2 text-lg font-semibold 
                 text-white bg-leafGreen hover:bg-coralRed 
                 rounded-lg transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
