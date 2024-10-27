import Link from "next/link";
import React from "react";
import { FiEye } from "react-icons/fi";
import FilterBtn from "./FilterBtn";
import { useTranslations } from "next-intl";
import { Task } from "@prisma/client";
import AddTask from "./AddTask";
import Pagination from "../pagination";

interface TasksProps {
  tasks: Task[],
  token: string,
  pages: number,
  pageNumber: number
}

const Tasks = ({tasks, token, pages, pageNumber}: TasksProps) => {
  const t = useTranslations("Tasks");
  return (
    <div className="fix-height">
      <FilterBtn/>
      <AddTask token={token}/>
      <div className="mx-auto mt-14">
        <div className="w-10/12 md:w-4/5 mx-auto text-sm md:text-lg">
          {/* Header du tableau */}
          <div className="table w-full bg-royalPurple text-white font-semibold rounded-t-lg">
            <div className="table-row">
              <div className="table-cell w-1/2 text-center p-3 border-r border-gray-300">
                <p>{t("taskaty")}</p>
              </div>
              <div className="table-cell w-1/3 text-center p-3 border-r border-gray-300">
                <p>{t("status")}</p>
              </div>
              <div className="table-cell w-1/6 text-center p-3">
                <p>{t("details")}</p>
              </div>
            </div>
          </div>

          <div className="my-2"></div>

          {tasks.map((task) => (
            <div
              className="table w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md mb-2 rounded-lg"
              key={task.id}
            >
              <div className="table-cell w-1/2 text-right p-3 border-r border-gray-300">
                <p>{task.title}</p>
              </div>

              <div
                className={`table-cell w-1/3 text-center text-sm md:text-lg font-bold p-3 border-r border-gray-300 ${
                  task.status === "Completed"
                    ? "text-leafGreen"
                    : task.status === "InProgress"
                    ? "text-goldenYellow"
                    : "text-coralRed"
                }`}
              >
                <p>{task.status}</p>
              </div>

              <div className="table-cell w-1/6 text-center p-3 hover:text-leafGreen">
                <Link
                  href={`/taskaties/${task.id}`}
                  className="flex justify-center items-center"
                >
                  <FiEye />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {pages > 1 && <Pagination route="/taskaties" pageNumber={pageNumber} pages={pages}/>}
    </div>
  );
};

export default Tasks;