import db from '../config/db.js';

export async function createUser(name, email, hashedPassword) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

export async function findUserById(id) {
  const [rows] = await db.query(
    'SELECT id, name, email FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}
