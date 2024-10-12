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
      <FilterBtn />
      <div className="mx-auto mt-14">
        <div className="w-10/12 md:w-4/5 mx-auto text-md md:text-lg">
          {/* Header du tableau */}
          <div className="table w-full bg-royalPurple text-white font-semibold rounded-t-lg">
            <div className="table-row">
              <div className="table-cell w-1/2 text-center p-3 border-r border-gray-300">
                <p>Taskaty</p>
              </div>
              <div className="table-cell w-1/3 text-center p-3 border-r border-gray-300">
                <p>Status</p>
              </div>
              <div className="table-cell w-1/6 text-center p-3">
                <p>Details</p>
              </div>
            </div>
          </div>

          {/* Espacement entre le header et les lignes */}
          <div className="my-2"></div>

          {/* Lignes du tableau */}
          {tasks.map((task) => (
            <div
              className="table w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md mb-2 rounded-lg"
              key={task.id}
            >
              <div className="table-cell w-1/2 text-left p-3 border-r border-gray-300">
                <p>{task.title}</p>
              </div>

              <div
                className={`table-cell w-1/3 text-center font-bold p-3 border-r border-gray-300 
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
    </div>
  );
};

export default Tasks;
