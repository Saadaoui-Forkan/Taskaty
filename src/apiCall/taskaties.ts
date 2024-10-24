import { Task } from "@prisma/client"

// Get Tasks
export async function fetchTasks(token: string): Promise<Task[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}`,{
        headers: {
            Cookie: `jwtToken=${token}`
        },
        cache: "no-store"
    })

    if (!response.ok) {
        throw new Error("Failed To Fetch Tasks")
    }
    
    const tasks = response.json()
    return tasks
}

// Get Single Task
export async function fetchSingleTask(token: string, id:number): Promise<Task> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}/${id}`,
        {
            headers: {
                Cookie: `jwtToken=${token}`
            }
        }
    )

    if (!res.ok) {
        throw new Error(`Failed To Fetch Task: ${id}`)
    }

    const singleTask = res.json()
    return singleTask
}