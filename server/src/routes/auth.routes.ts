import { Router } from 'express';
import db from '../database';

const router = Router();

// Register User
router.post('/register', async (req, res) => {
  const { email, password, password2, username } = req.body;

  if (password !== password2) {
    res.status(400).json({ message: 'Passwords must match' });
    return;
  }

  try {
    const [user] = await db
      .insert({ email, password, username })
      .into('users')
      .returning(['id', 'email', 'username']);

    await db.insert({ user_id: user.id }).into('user_profile');

    res.status(201).json({ message: 'User registered! ✅', data: user });
  } catch (err: any) {
    const isUniqueConstraint = !!err.constraint?.includes('unique');

    if (isUniqueConstraint) {
      res.status(400).json({ message: 'Username/email already exists 😢❌' });
      return;
    }

    console.error(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'email and password are required' });
    return;
  }

  try {
    const [user] = await db('users').where({ email });

    if (user.password != password) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    res.status(201).json({ message: 'Login Successful✅', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

export default router;
