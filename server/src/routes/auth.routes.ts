import { Router } from 'express';
import * as userRepository from '../repositories/user.repository';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const router = Router();

// Register User
router.post('/register', async (req, res) => {
  const { email, password, password2, username } = req.body;

  if (password !== password2) {
    res.status(400).json({ message: 'Passwords must match' });
    return;
  }

  try {
    const user = await userRepository.create({ email, password, username });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.status(201).json({
      message: 'User registered! ✅',
      data: { ...user, password: undefined },
      token,
    });
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
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    res
      .status(400)
      .json({ message: 'email/username and password are required' });
    return;
  }

  try {
    const user = await userRepository.findByEmailOrUsername(emailOrUsername);

    if (!user || user.password !== password) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.status(201).json({
      message: 'Login Successful✅',
      data: { ...user, password: undefined },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

export default router;
