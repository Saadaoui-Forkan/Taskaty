import { fetchTasks } from "@/apiCall/taskaties";
import Navbar from "@/components/taskaty/Navbar";
import Tasks from "@/components/taskaty/Tasks";
import { verifyTokenForClient } from "@/utils/verifyToken";
import { Task } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Taskaty = async() => {
  const token = cookies().get("jwtToken")?.value || ""
  const payload = verifyTokenForClient(token) 
  if (!token) {
    redirect('/')
  } 

  const tasks: Task[] = await fetchTasks(token)
  return (
    <div className="dark:bg-dustyGray">
      <Navbar payload = {payload}/>
      <Tasks tasks={tasks}/>
    </div>
  );
};

export default Taskaty;
