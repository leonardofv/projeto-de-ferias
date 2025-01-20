import { Router } from 'express';
import db from '../database';

const router = Router();

// Create a new Post
router.post('/', async (req, res) => {
  const { user_id, path, description } = req.body;

  if (!user_id || !path) {
    res.status(401).json({ message: 'user_id and path are required' });
    return;
  }
  try {
    const [post] = await db
      .insert({ user_id, path, description })
      .into('post')
      .returning(['user_id', 'path', 'publish_date', 'description']);

    res.status(201).json({ message: 'post created successful✅', data: post });
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
    const posts = await db.select('*').from('post');

    res
      .status(201)
      .json({ message: 'Posts retrivied successful✅', data: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong 😢❌' });
  }
});

export default router;
