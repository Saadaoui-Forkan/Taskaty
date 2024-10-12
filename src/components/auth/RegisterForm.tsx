"use client"
import React from "react";

const RegisterForm = () => {
  return (
    <div>
      <form>
        <div className="flex justify-between">
          <div className="w-1/2 mr-2">
            <label className="text-gray-400">
              First Name<span className="req text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="field-wrap w-1/2 ml-2">
            <label className="text-gray-400">
              Last Name<span className="req text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-400">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="button button-block w-full py-2 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
