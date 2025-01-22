import db from '../database';
import type { User } from './user.repository';

type Post = {
  id: number;
  path: string;
  publishDate: Date;
  userId: User['id'];
  description?: string;
};

export const create = async ({
  path,
  userId,
  description,
}: Omit<Post, 'id' | 'publishDate'>): Promise<Post> => {
  const [post] = await db
    .insert({ path, description, user_id: userId })
    .into('post')
    .returning(['id', 'path', 'description', 'publish_date', 'user_id']);

  return {
    id: post.id,
    path: post.path,
    publishDate: post.publish_date,
    userId: post.user_id,
    description: post.description,
  };
};

export const getAll = async (): Promise<Post[]> => {
  return db
    .column('id', 'path', 'description', {
      publishDate: 'publish_date',
      userId: 'user_id',
    })
    .select()
    .from('post');
};
