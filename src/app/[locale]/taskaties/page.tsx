import Navbar from "@/components/taskaty/Navbar";
import Tasks from "@/components/taskaty/Tasks";
import { verifyTokenForClient } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Taskaty = () => {
  const token = cookies().get("jwtToken")?.value || ""
  const payload = verifyTokenForClient(token) 
  if (!token) {
    redirect('/')
  } 
  return (
    <div className="dark:bg-dustyGray">
      <Navbar payload = {payload}/>
      <Tasks/>
    </div>
  );
};

export default Taskaty;
