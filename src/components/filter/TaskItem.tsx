import { Task } from '@prisma/client'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

interface TaskItemProps {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    const t = useTranslations("Filter Results")
    return (
        <div
            key={task.id}
            className="bg-white dark:bg-slateGray rounded-lg shadow-md p-6 w-full sm:w-[300px] 
                       hover:scale-105 transition-transform duration-200 ease-in-out"
        >
            <h2 className="text-lg font-semibold text-royalPurple dark:text-white mb-2">
                {task.title}
            </h2>
            <p className="text-sm text-dustyGray dark:text-coolGray mb-1">
                {t('taskStatus')} <span className="font-medium">{task.status}</span>
            </p>
            <p className="text-sm text-dustyGray dark:text-coolGray mb-1">
                {t('from')} {moment(task.from).format('DD/MM/YYYY')}
            </p>
            <p className="text-sm text-dustyGray dark:text-coolGray mb-3">
                {t('to')} {moment(task.to).format('DD/MM/YYYY')}
            </p>
            <Link
                href={`/taskaties/${task.id}`}
                className="text-rubyRed dark:text-coralRed hover:underline font-medium"
            >
                {t('viewDetails')}
            </Link>
        </div>
    )
}

export default TaskItem