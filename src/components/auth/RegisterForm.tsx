"use client";
import React from "react";

const RegisterForm = () => {
  return (
    <div>
      <form>
        {/* First Name & Last Name Fields */}
        <div className="flex justify-between">
          <div className="w-1/2 mr-2">
            <label className="text-dustyGray dark:text-coolGray">
              First Name<span className="req text-rubyRed">*</span>
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

          <div className="w-1/2 ml-2">
            <label className="text-dustyGray dark:text-coolGray">
              Last Name<span className="req text-rubyRed">*</span>
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
            Email Address<span className="text-rubyRed">*</span>
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
            Password<span className="text-rubyRed">*</span>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
