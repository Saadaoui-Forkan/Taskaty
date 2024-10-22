import { Task } from "@prisma/client"

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