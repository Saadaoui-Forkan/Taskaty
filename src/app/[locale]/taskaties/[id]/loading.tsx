import React from 'react'

const loading = () => {
    return (
        <div className="w-full p-6 bg-white dark:bg-gray-800 mx-auto py-6 animate-pulse fix-single-task-height">
            
            <div className="m-4 flex items-center">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>

            
            <div className="flex flex-col items-start mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 w-full px-2">
                <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
                <div className="flex gap-2 text-sm mt-2">
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <span>|</span>
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                </div>
            </div>
  
            <div className="mb-6 h-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

            <div className="border-b pb-4 border-gray-200 dark:border-gray-700"></div>
            
            <div className="flex justify-around mb-6 text-md pt-4">
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <span>|</span>
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>

           
            <div className="flex justify-end gap-3 mt-4">
                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>
        </div>

    )
}

export default loading