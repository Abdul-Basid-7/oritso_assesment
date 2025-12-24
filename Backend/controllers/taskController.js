import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  searchTasksByTitle
} from '../models/taskModel.js';

export async function create(req, res) {
  const taskId = await createTask({
    ...req.body,
    created_by: req.userId,
    updated_by: req.userId
  });

  res.status(201).json({ message: 'Task created', taskId });
}

export async function getAll(req, res) {
  const tasks = await getAllTasks();
  res.json(tasks);
}

export async function update(req, res) {
  await updateTask(req.params.id, {
    ...req.body,
    updated_by: req.userId
  });
  res.json({ message: 'Task updated' });
}

export async function remove(req, res) {
  await deleteTask(req.params.id);
  res.json({ message: 'Task deleted' });
}

export async function search(req, res) {
  const tasks = await searchTasksByTitle(req.query.title);
  res.json(tasks);
}
