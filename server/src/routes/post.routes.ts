import { Router } from 'express';
import * as postRepository from '../repositories/post.repository';

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
router.get('/', async (_, res) => {
  try {
    // if(!user) {
    //   res.status(404).json({message: 'user not found😢'});
    // }
    const posts = await postRepository.getAll();
    res.status(201).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

export default router;
