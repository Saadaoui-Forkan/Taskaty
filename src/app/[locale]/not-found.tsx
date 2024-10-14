'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    const t = useTranslations('NotFound')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4 animate-bounce">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl mb-8">
          {t('body')}
        </p>
        <Link href="/" className="cursor-pointer bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300">
            {t('back')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound