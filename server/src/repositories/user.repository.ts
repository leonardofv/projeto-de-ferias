import db from '../database';

export type User = {
  id: number;
  email: string;
  password: string;
  username?: string;
};

export const create = async ({
  email,
  password,
  username,
}: Omit<User, 'id'>): Promise<User> => {
  const [user] = await db
    .insert({ email, password, username })
    .into('users')
    .returning(['id', 'email', 'username', 'password']);

  await db.insert({ user_id: user.id }).into('user_profile');

  return user;
};

export const findByEmailOrUsername = async (
  emailOrUsername: string,
): Promise<User> => {
  const user = await db('users')
    .where({ email: emailOrUsername })
    .orWhere({ username: emailOrUsername })
    .first();

  return user;
};
