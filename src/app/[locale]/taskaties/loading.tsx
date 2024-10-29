import React from 'react'

const loading = () => {
    const tasksSkeleton = [1, 2, 3, 4, 5, 6];
    return (
        <div className="bg-white dark:bg-gray-700 animate-pulse fix-height">

            <div className="fixed top-16 left-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full w-10 h-10"></div>
            <div className="fixed top-16 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full w-10 h-10"></div>

            <div className="mt-14 flex flex-wrap justify-center">
                {tasksSkeleton.map((_, index) => (
                    <div
                        key={index}
                        className="rounded-md m-2 px-2 py-3 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 w-full md:w-2/5 lg:w-1/4"
                    >
                        <div className="w-[120px] my-3 rounded-sm h-6 bg-gray-200 dark:bg-gray-900"></div>
                        <h3 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-6 rounded-md"></h3>
                        <p className="my-2 text-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 p-1 h-10 rounded-md"></p>
                        <div className="w-full block p-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg h-8"></div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-2 mb-10">
                <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-60 rounded-md h-9 animate-shimmer"></div>
            </div>
        </div>
    )
}

export default loading