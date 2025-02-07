// src/app/components/TaskForm.tsx
'use client'

import { useState } from 'react'
import { createTask, updateTask } from '../actions/taskActions'
import { ITask } from '../lib/types'

interface TaskFormProps {
  task?: Omit<ITask, '_id'> & { _id?: string };
  onClose?: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    const result = task && task._id
      ? await updateTask(task._id, formData)
      : await createTask(formData)
      
    if (result.error) {
      setError(result.error)
    } else if (onClose) {
      onClose()
    }
    
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
  <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      type="text"
      name="title"
      id="title"
      defaultValue={task?.title}
      required
      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
      placeholder="Enter task title"
    />
  </div>

  <div>
    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
      Description
    </label>
    <textarea
      name="description"
      id="description"
      defaultValue={task?.description}
      rows={3}
      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
      placeholder="Enter task description"
    />
  </div>

  <div>
    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
      Due Date
    </label>
    <input
      type="date"
      name="dueDate"
      id="dueDate"
      defaultValue={task?.dueDate}
      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {error && (
    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
      {error}
    </div>
  )}

  <div className="flex justify-end space-x-3">
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
    )}
    <button
      type="submit"
      disabled={loading}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
    >
      {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
    </button>
  </div>
</form>

  )
}