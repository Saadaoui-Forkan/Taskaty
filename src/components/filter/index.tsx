import React from 'react'
import TaskItem from '../taskaty/TaskItem'
import moment from 'moment'
import Link from 'next/link'
import { Task } from '@prisma/client'
import { useTranslations } from 'next-intl'

interface FilteredTasksProps {
    tasks: Task[],
    status?: string,
    from?: string,
    to?: string
}

const FilteredTasks = ({ tasks, status, from, to }: FilteredTasksProps) => {
    const t = useTranslations("Filter Results")
    return (
        <>
        {tasks.length === 0 ? (
            <div className="text-center space-y-4 bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
                <h1 className="text-2xl font-semibold text-slateGray dark:text-coolGray">
                    {t('noResultsFound')}
                </h1>
                <p className="text-dustyGray dark:text-coolGray">
                    {t('trySearching')}
                </p>
                <Link
                    href="/taskaties?pageNumber=1"
                    className="text-royalPurple dark:text-leafGreen hover:underline"
                >
                    {t('backToArticles')}
                </Link>
            </div>
        ) : (
            <>
                <Link
                    href="/taskaties?pageNumber=1"
                    className="text-royalPurple dark:text-leafGreen hover:underline"
                >
                    {t('backToArticles')}
                </Link>
                <h1 className="text-xl font-semibold text-slateGray dark:text-white">
                    {t('searchResultsFor')}
                </h1>
                <div className="flex-wrap gap-2 flex flex-col">
                    {status && (
                        <span className="text-coralRed dark:text-goldenYellow">
                            {t('taskStatus')} {status}
                        </span>
                    )}
                    {from && (
                        <span className="text-leafGreen">
                            {t('from')} {moment(from).format('DD/MM/YYYY')}
                        </span>
                    )}
                    {to && (
                        <span className="text-goldenYellow">
                            {t('to')} {moment(to).format('DD/MM/YYYY')}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-center flex-wrap gap-7 mt-3">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </>
        )}</>
    )
}

export default FilteredTasks