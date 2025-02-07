'use client'

import { useState } from 'react'
import { toggleTaskComplete, deleteTask } from '../actions/taskActions'
import { Trash2 } from 'lucide-react'

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }
}

export default function TaskItem({ task }: TaskItemProps) {
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    await toggleTaskComplete(task._id)
    setLoading(false)
  }

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this task?')) {
      setLoading(true)
      await deleteTask(task._id)
      setLoading(false)
    }
  }

  return (
    <div className={`group p-4 rounded-lg border transition-all ${
      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="pt-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              disabled={loading}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className={`text-base font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            {task.dueDate && (
              <p className="mt-2 text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={loading}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}