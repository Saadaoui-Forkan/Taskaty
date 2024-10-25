import { fetchTasks } from "@/apiCall/taskaties";
import Navbar from "@/components/taskaty/Navbar";
import Tasks from "@/components/taskaty/Tasks";
import { TASKS_PER_PAGE } from "@/utils/constants";
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
  const pages = Math.ceil(data.count/TASKS_PER_PAGE)
  return (
    <div className="dark:bg-dustyGray">
      <Navbar payload = {payload}/>
      <Tasks tasks={data.tasks} token={token} pageNumber={parseInt(pageNumber)} pages={pages}/>
    </div>
  );
};

export default Taskaty;
