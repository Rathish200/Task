// src/app/page.tsx
import { getTasks } from './actions/taskActions'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import { ClipboardList } from 'lucide-react'
interface TaskData {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: Date;
}
export default async function Home() {
  const { tasks, error } = await getTasks() as { 
    tasks?: TaskData[], 
    error?: string 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Task</h2>
          <TaskForm />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : !tasks || tasks.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tasks yet. Create one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}