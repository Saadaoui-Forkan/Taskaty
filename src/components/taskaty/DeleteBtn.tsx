import { useTranslations } from 'next-intl';
import React from 'react'

const DeleteBtn = () => {
    const t = useTranslations("Add Task");
    return (
        <div>
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-md 
                            hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            >
                {t('delete')}
            </button>
        </div>
    )
}

export default DeleteBtn