// 'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'

const BackLink = () => {
    const t = useTranslations("Add Task");
    return (
        <div className="m-4 flex items-center">
            <Link
                href="/taskaties"
                className="
            text-lg font-semibold text-blue-600 hover:text-blue-800 
            underline underline-offset-4 hover:no-underline transition-all
            dark:text-blue-400 dark:hover:text-blue-500"
            >
                {t('back')}
            </Link>
        </div>
    )
}

export default BackLink