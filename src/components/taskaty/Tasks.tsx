import Link from "next/link";
import React from "react";
import { FiClock } from "react-icons/fi";
import FilterBtn from "./FilterBtn";
import { useTranslations } from "next-intl";
import { Task } from "@prisma/client";
import AddTask from "./AddTask";
import Pagination from "../pagination";
import moment from "moment";
import TaskItem from "./TaskItem";

interface TasksProps {
  tasks: Task[],
  token: string,
  pages: number,
  pageNumber: number
}

const Tasks = ({ tasks, token, pages, pageNumber }: TasksProps) => {
  const t = useTranslations("Tasks");
  return (
    <div className="fix-height">
      <FilterBtn />
      <AddTask token={token} />
      <div className="mt-14 flex flex-wrap justify-center">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id}/>
        ))}
      </div>
      {pages > 1 && (
        <Pagination route="/taskaties" pageNumber={pageNumber} pages={pages} />
      )}
    </div>
  );
};

export default Tasks;