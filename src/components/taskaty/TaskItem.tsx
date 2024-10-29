import { Task } from '@prisma/client'
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'
import { FiClock } from 'react-icons/fi';

interface TaskItemProps {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    const t = useTranslations("Tasks");
    return (
        <div
            className="p-6 m-4 rounded-md
              bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-full md:w-2/5 lg:w-1/4"
        >
            {/* Status Label */}
            <div
                className={`text-white w-[120px] px-3 py-1 rounded-sm text-sm font-semibold 
                  ${task.status === "Completed"
                        ? "bg-leafGreen dark:text-white"
                        : task.status === "InProgress"
                            ? "bg-goldenYellow dark:text-gray-500"
                            : "bg-coralRed dark:text-white"
                    }`}
            >
                {task.status === "Completed"
                    ? t("completed")
                    : task.status === "InProgress"
                        ? t("in_progress")
                        : task.status === "NotStarted"
                            ? t("not_started")
                            : ""}
            </div>

            {/* Task Title */}
            <div className="mt-8">
                <h2
                    className="text-lg md:text-xl font-bold mb-2 line-clamp-1 
                  dark:text-white text-gray-900"
                >
                    {task.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 my-3">
                    <FiClock className="text-lg" />
                    <span className="px-1">
                        {t("createdAt")} {moment(task.createdAt).format("DD-MM-YYYY")}
                    </span>
                </div>
            </div>

            <div className="mt-auto w-full">
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-3">
                    <Link
                        href={`/taskaties/${task.id}`}
                        className="w-full flex justify-center items-center gap-1
                      font-semibold text-leafGreen dark:text-goldenYellow 
                    hover:text-coralRed transition-colors duration-300"
                    >
                        {t("details")}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TaskItem