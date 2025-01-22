import { Router } from 'express';
import * as postRepository from '../repositories/post.repository';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const router = Router();

// Create a new Post
router.post('/', async (req, res) => {
  const { user_id, path, description } = req.body;

  if (!user_id || !path) {
    res.status(401).json({ message: 'user_id and path are required' });
    return;
  }
  try {
    const post = await postRepository.create({
      path,
      description,
      userId: user_id,
    });

    res
      .status(201)
      .json({ message: 'Post created successfully ✅', data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

// List all Posts
router.get('/', async (req, res) => {
  try {
    // if(!user) {
    //   res.status(404).json({message: 'user not found😢'});
    // }
    const authHeader = req.headers.authorization ?? '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).send();
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const posts = await postRepository.getByUserId(decoded.id);
    res.status(201).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

export default router;
