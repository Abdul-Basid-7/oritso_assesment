import db from '../config/db.js';

// CREATE TASK (NO CHANGE)
export async function createTask(task) {
  const [result] = await db.query(
    `INSERT INTO tasks 
     (title, description, due_date, status, remarks, created_by, updated_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      task.title,
      task.description,
      task.due_date,
      task.status,
      task.remarks,
      task.created_by,
      task.updated_by
    ]
  );
  return result.insertId;
}

// READ ALL TASKS (UPDATED WITH JOIN)
export async function getAllTasks() {
  const [rows] = await db.query(`
    SELECT 
      t.id,
      t.title,
      t.description,
      t.due_date,
      t.status,
      t.remarks,
      t.created_at,
      t.updated_at,
      t.created_by,
      t.updated_by,
      cu.name AS created_by_name,
      uu.name AS updated_by_name
    FROM tasks t
    JOIN users cu ON t.created_by = cu.id
    JOIN users uu ON t.updated_by = uu.id
    ORDER BY t.created_at DESC
  `);
  return rows;
}

// UPDATE TASK (NO CHANGE)
export async function updateTask(id, task) {
  await db.query(
    `UPDATE tasks SET 
     title = ?, 
     description = ?, 
     due_date = ?, 
     status = ?, 
     remarks = ?, 
     updated_by = ?
     WHERE id = ?`,
    [
      task.title,
      task.description,
      task.due_date,
      task.status,
      task.remarks,
      task.updated_by,
      id
    ]
  );
}

// DELETE TASK (NO CHANGE)
export async function deleteTask(id) {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}

// SEARCH TASK BY TITLE (UPDATED WITH JOIN)
export async function searchTasksByTitle(title) {
  const [rows] = await db.query(
    `
    SELECT 
      t.id,
      t.title,
      t.description,
      t.due_date,
      t.status,
      t.remarks,
      t.created_at,
      t.updated_at,
      t.created_by,
      t.updated_by,
      cu.name AS created_by_name,
      uu.name AS updated_by_name
    FROM tasks t
    JOIN users cu ON t.created_by = cu.id
    JOIN users uu ON t.updated_by = uu.id
    WHERE t.title LIKE ?
    ORDER BY t.created_at DESC
    `,
    [`%${title}%`]
  );
  return rows;
}
