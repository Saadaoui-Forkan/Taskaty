import { Task } from "@prisma/client";

interface FetchTasksType {
  tasks: Task[];
  count: number;
}
export async function fetchTasks(
  token: string,
  pageNumber: string | undefined
): Promise<FetchTasksType> {
  const validPage = parseInt(pageNumber || "1");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/taskaties?pageNumber=${
      isNaN(validPage) ? 1 : validPage
    }`,
    {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed To Fetch Tasks");
  }
  const data = response.json();
  return data;
}

// Get Single Task
export async function fetchSingleTask(
  token: string,
  id: number
): Promise<Task> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}/${id}`,
    {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed To Fetch Task: ${id}`);
  }

  const singleTask = await res.json();
  return singleTask;
}

// Fetch Tasks By Multiple Filters
export async function fetchTasksByFilters(
  token: string,
  status?: string,
  from?: string,
  to?: string
): Promise<Task[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/taskaties/filter?status=${status ? status : ""}&from=${from ? from : ""}&to=${to ? to : ""}`,
    {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data.tasks;
}
