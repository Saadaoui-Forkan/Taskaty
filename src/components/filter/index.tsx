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
                    <div className="space-y-1">
                        <Link
                            href="/taskaties?pageNumber=1"
                            className="inline-flex items-center gap-2 px-4 py-2 my-2 bg-gray-200 
                            dark:bg-gray-700 rounded-md text-royalPurple 
                            dark:text-leafGreen hover:bg-gray-300 
                            dark:hover:bg-gray-600 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            {t('backToArticles')}
                        </Link>

                        <h1 className="text-xl font-bold text-slateGray dark:text-white">
                            {t('searchResultsFor')}
                        </h1>

                        <div className="flex flex-col gap-3">
                            {status && (
                                <span className="text-lg font-medium text-coralRed dark:text-goldenYellow">
                                    {t('taskStatus')} <span className="font-normal">{status}</span>
                                </span>
                            )}
                            {from && (
                                <span className="text-lg font-medium text-leafGreen">
                                    {t('from')} <span className="font-normal">{moment(from).format('DD/MM/YYYY')}</span>
                                </span>
                            )}
                            {to && (
                                <span className="text-lg font-medium text-goldenYellow">
                                    {t('to')} <span className="font-normal">{moment(to).format('DD/MM/YYYY')}</span>
                                </span>
                            )}
                        </div>
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