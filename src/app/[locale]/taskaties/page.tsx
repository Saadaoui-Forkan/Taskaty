import Navbar from "@/components/taskaty/Navbar";
import Tasks from "@/components/taskaty/Tasks";
import React from "react";

const Taskaty = () => {
  return (
    <div className="dark:bg-dustyGray">
      <Navbar />
      <Tasks/>
    </div>
  );
};

export default Taskaty;
