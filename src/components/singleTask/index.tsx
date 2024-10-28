"use client"
import { Task } from '@prisma/client'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';

interface TaskDetailsProps {
    task: Task
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
    const t = useTranslations("Single Task");
    const locale = useLocale()
    const direction = locale === 'ar' ? 'rtl' : 'ltr'
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !task) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-col items-start mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 w-full px-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {task.title}
                </h2>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span>{t('createdAt')} {moment(task.createdAt).format("DD-MM-YYYY")}</span>
                    {task.createdAt !== task.updatedAt && <span>|</span>}
                    {task.createdAt !== task.updatedAt && (
                        <span>{t('lastUpdate')} {moment(task.updatedAt).format("DD-MM-YYYY")}</span>
                    )}
                </div>
            </div>
            <p
                className="mb-6 text-gray-700 dark:text-gray-300 text-justify ql-editor"
                dir={direction}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }}
            />
            <div className='border-b pb-4 border-gray-200 dark:border-gray-700'></div>

            <div className="flex justify-around mb-6 text-md text-gray-500 dark:text-gray-400 pt-4">
                <div>
                    <span className="font-semibold">{t('from')}</span> {moment(task.from).format("DD-MM-YYYY")}
                </div>
                <span>|</span>
                <div>
                    <span className="font-semibold">{t('to')}</span> {moment(task.to).format("DD-MM-YYYY")}
                </div>
            </div>
        </>
    )
}

export default TaskDetails