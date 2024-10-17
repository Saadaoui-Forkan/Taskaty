import React, { useState } from "react";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

interface ToastProps {
  alertText: string;
  type: string;
}

const Toast = ({ alertText, type }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  let icon =
    type === "success" ? (
      <FaCheck className="text-lg text-leafGreen md:text-2xl" />
    ) : type === "warning" ? (
      <FaExclamationTriangle className="text-lg text-goldenYellow md:text-2xl" />
    ) : (
      <BiSolidErrorAlt className="text-lg text-rubyRed md:text-2xl" />
    );

  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 
        w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-lg 
        bg-gray-100 dark:bg-slateGray shadow-lg rounded-lg p-4 space-y-4 
        animate-slide-in`}
    >
      <button
        className="absolute top-2 right-2 dark:text-white text-gray-900"
        onClick={() => setVisible(false)}
      >
        <IoCloseCircle className="text-2xl"/>
      </button>
      <div className="flex items-center space-x-4">
        {icon}
        <p
          className={`text-lg md:text-xl font-semibold ${
            type === "success"
              ? "text-leafGreen"
              : type === "warning"
              ? "text-goldenYellow"
              : "text-rubyRed"
          }`}
        >
          {alertText}
        </p>
      </div>
      <div className={`relative w-full h-1 rounded ${
            type === "success"
              ? "bg-leafGreen"
              : type === "warning"
              ? "bg-goldenYellow"
              : "bg-rubyRed"
          } animate-progress-bar`}>
        <div className={`absolute left-0 top-0 h-full`}></div>
      </div>
    </div>
  );
};

export default Toast;
