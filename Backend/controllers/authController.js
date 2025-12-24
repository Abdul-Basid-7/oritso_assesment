import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createUser,
  findUserByEmail
} from '../models/userModel.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  // 1️⃣ Check user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  //  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userId = await createUser(name, email, hashedPassword);

  //generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({
    message: 'User registered successfully',
    token
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  // 1️⃣ Check user exists
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // 3️⃣ Generate token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    message: 'Login successful',
    token
  });
}
