"use client"
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <form>
        <div className="field-wrap mb-4">
          <label className="text-gray-400">
            Email Address<span className="req text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="field-wrap mb-6">
          <label className="text-gray-400">
            Password<span className="req text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <p className="forgot text-right text-gray-400">
          <a href="#" className="text-green-500 hover:underline">
            Forgot Password?
          </a>
        </p>

        <button className="button button-block w-full py-2 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
