import { fetchSingleTask } from '@/apiCall/taskaties';
import BackLink from '@/components/singleTask/BackLink';
import DeleteBtn from '@/components/singleTask/DeleteBtn';
import TaskDetails from '@/components/singleTask';
import UpdateTask from '@/components/singleTask/UpdateTask';
import { verifyTokenForClient } from '@/utils/verifyToken'
import { Task } from '@prisma/client';
import { cookies } from 'next/headers'
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
            <TaskDetails task = {task} />
            <div className="flex justify-end gap-3 mt-4">
                <UpdateTask task={task} id={parseInt(params.id)} token={token}/>
                <DeleteBtn task={task} id={parseInt(params.id)} token={token}/>
            </div>
        </div>
    )
}

export default SingleTask