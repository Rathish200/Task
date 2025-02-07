import { ObjectId } from 'mongodb'

export interface ITask {
  _id: ObjectId;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: Date;
}