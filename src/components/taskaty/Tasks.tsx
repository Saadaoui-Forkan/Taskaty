import Link from "next/link";
import React from "react";
import { FiEye } from "react-icons/fi";
import FilterBtn from "./FilterBtn";
import { useTranslations } from "next-intl";

const Tasks = () => {
  const t = useTranslations("Tasks");
  const tasks = [
    { id: 1, title: "Task 1", status: "Completed" },
    { id: 2, title: "Task 2", status: "In Progress" },
    { id: 3, title: "Task 3", status: "Not Started" },
    { id: 4, title: "Task 4", status: "Not Started" },
    { id: 5, title: "Task 5", status: "Not Started" },
    { id: 6, title: "Task 6", status: "Not Started" },
    { id: 7, title: "Task 7", status: "Not Started" },
    { id: 8, title: "Task 8", status: "Not Started" },
    { id: 9, title: "Task 9", status: "Not Started" },
    { id: 10, title: "Task 10", status: "Not Started" },
  ];

  return (
    <div className="fix-height">
      <FilterBtn />
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