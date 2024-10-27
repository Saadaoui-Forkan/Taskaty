import { fetchTasksByFilters } from '@/apiCall/taskaties';
import FilteredTasks from '@/components/filter';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface FilterTasksProps {
  searchParams: {
    status?: string,
    from?: string,
    to?: string
  };
}

const Filter = async ({ searchParams: { status, from, to } }: FilterTasksProps) => {
  const token = cookies().get("jwtToken")?.value || ""
  if (!token) {
    redirect('/')
  }
  const tasks = await fetchTasksByFilters(token, status, from, to)
  return (
    <section className="px-4 py-8 md:px-12 lg:px-24 fix-single-task-height bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <FilteredTasks tasks={tasks} status={status} from={from} to={to} />
    </section>
  )
}

export default Filter