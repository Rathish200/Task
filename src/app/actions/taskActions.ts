'use server'

import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import clientPromise from '../lib/mongodb'

export async function getTasks() {
  try {
    const client = await clientPromise
    const db = client.db('taskmanager')
    const tasks = await db.collection('tasks')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    return { 
      tasks: tasks.map(task => ({
        ...task,
        _id: task._id.toString()
      }))
    }
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    return { error: 'Failed to fetch tasks' }
  }
}

export async function createTask(formData: FormData) {
  try {
    const client = await clientPromise
    const db = client.db('taskmanager')
    
    const newTask = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      completed: false,
      createdAt: new Date()
    }
    
    await db.collection('tasks').insertOne(newTask)
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('Failed to create task:', err)
    return { error: 'Failed to create task' }
  }
}

export async function updateTask(taskId: string, formData: FormData) {
  try {
    const client = await clientPromise
    const db = client.db('taskmanager')
    
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          title: formData.get('title'),
          description: formData.get('description'),
          dueDate: formData.get('dueDate'),
          updatedAt: new Date()
        }
      }
    )
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('Failed to update task:', err)
    return { error: 'Failed to update task' }
  }
}

export async function toggleTaskComplete(taskId: string) {
  try {
    const client = await clientPromise
    const db = client.db('taskmanager')
    
    const task = await db.collection('tasks').findOne({ _id: new ObjectId(taskId) })
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { completed: !task?.completed } }
    )
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('Failed to toggle task status:', err)
    return { error: 'Failed to toggle task status' }
  }
}

export async function deleteTask(taskId: string) {
  try {
    const client = await clientPromise
    const db = client.db('taskmanager')
    
    await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) })
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('Failed to delete task:', err)
    return { error: 'Failed to delete task' }
  }
}