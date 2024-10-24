import { fetchSingleTask } from '@/apiCall/taskaties';
import BackLink from '@/components/taskaty/BackLink';
import DeleteBtn from '@/components/taskaty/DeleteBtn';
import UpdateTask from '@/components/taskaty/UpdateTask';
import { verifyTokenForClient } from '@/utils/verifyToken'
import { Task } from '@prisma/client';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import { cookies } from 'next/headers'
import Link from 'next/link';
import { redirect } from 'next/navigation'

interface SingleTaskProps {
    params: { id: string };
}

const SingleTask = async({params}: SingleTaskProps) => {
    const token = cookies().get("jwtToken")?.value || ''
    const payload = verifyTokenForClient(token)
    if (!payload) {
        redirect('/')
    }
    
    const task: Task = await fetchSingleTask(token, parseInt(params.id))
    return (
        <div
            className="w-full p-6 bg-white dark:bg-gray-800 mx-auto py-6 fix-single-task-height"
        >
            <BackLink/>
            <div className="flex flex-col items-start mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 w-full px-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {task.title}
                </h2>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span>Created At: {moment(task.createdAt).format("DD-MM-YYYY")}</span>
                    {task.createdAt !== task.updatedAt && <span>|</span>}
                    {task.createdAt !== task.updatedAt && (
                        <span>Last Update: {moment(task.updatedAt).format("DD-MM-YYYY")}</span>
                    )}
                </div>
            </div>


            <p 
                className="mb-6 text-gray-700 dark:text-gray-300 text-justify" 
                dangerouslySetInnerHTML={{ __html: task.description }}
            >
                {/* {task.description} */}
            </p>
            <div className='border-b pb-4 border-gray-200 dark:border-gray-700'></div>


            <div className="flex justify-around mb-6 text-md text-gray-500 dark:text-gray-400 pt-4">
                <div>
                    <span className="font-semibold">From:</span> {moment(task.from).format("DD-MM-YYYY")}
                </div>
                <span>|</span>
                <div>
                    <span className="font-semibold">To:</span> {moment(task.to).format("DD-MM-YYYY")}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <UpdateTask task={task} id={parseInt(params.id)} token={token}/>
                <DeleteBtn/>
            </div>
        </div>
    )
}

export default SingleTask