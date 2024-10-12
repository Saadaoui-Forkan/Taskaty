import Link from "next/link";
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import FilterBtn from "./FilterBtn";

const Tasks = () => {
  const tasks = [
    { id: 1, title: "Task 1", status: "Completed" },
    { id: 2, title: "Task 2", status: "In Progress" },
    { id: 3, title: "Task 3", status: "Not Started" },
  ];
  return (
    <div className="">
      <FilterBtn/>
      <div className="mx-auto mt-14">
        <div className="table w-10/12 md:w-4/5 mx-auto text-md md:text-lg bg-transparent">
          <div className="table-row bg-royalPurple text-white font-semibold">
            <div className="table-cell w-1/2 text-center p-1 border-r">
              <p>Taskaty</p>
            </div>
            <div className="table-cell w-1/3 text-center border-r p-1">
              <p>Status</p>
            </div>
            <div className="table-cell w-1/6 text-center p-1">
              <p>Details</p>
            </div>
          </div>

          <div className="my-2"></div>

          {tasks.map((task) => (
            <div
              className="table-row bg-transparent text-gray-500 shadow-md my-2 mt-2"
              key={task.id}
            >
              <div className="table-cell w-1/2 text-left p-3 border-r">
                <p>{task.title}</p>
              </div>
              <div
                className={`table-cell w-1/3 text-center font-bold p-3 border-r 
                ${
                  task.status === "Completed"
                    ? "text-leafGreen"
                    : task.status === "In Progress"
                    ? "text-goldenYellow"
                    : "text-coralRed"
                }`}
              >
                <p>{task.status}</p>
              </div>
              <div className="table-cell w-1/6 p-3 hover:text-leafGreen">
                <Link
                  className="flex justify-center items-center"
                  href={`/taskaties/${task.id}`}
                >
                  <FiEye />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
