import { fetchTasks } from "@/apiCall/taskaties";
import Navbar from "@/components/taskaty/Navbar";
import Tasks from "@/components/taskaty/Tasks";
import { verifyTokenForClient } from "@/utils/verifyToken";
import { Task } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface TasksPageProps {
  searchParams: { pageNumber: string }
}

const Taskaty = async({searchParams}: TasksPageProps) => {
  const {pageNumber} = searchParams
  const token = cookies().get("jwtToken")?.value || ""
  const payload = verifyTokenForClient(token) 
  if (!token) {
    redirect('/')
  } 

  const data = await fetchTasks(token, pageNumber)
  return (
    <div className="dark:bg-dustyGray">
      <Navbar payload = {payload}/>
      <Tasks tasks={data.tasks} token={token}/>
    </div>
  );
};

export default Taskaty;
