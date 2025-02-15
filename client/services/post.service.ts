export interface Post {
  id: number;
  userId: number;
  path: string;
  publishDate: string;
  description?: string;
}
const URL = process.env.EXPO_PUBLIC_API_URL;

export class PostService {
  static async fetchPosts(token: string): Promise<Post[]> {
    try {
      const response = await fetch(`${URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Fetched posts:', data); // post no console
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  static async create(
    token: string,
    content: string,
    fileName: string,
    description?: string,
  ): Promise<Post> {
    const response = await fetch(`${URL}/posts`, {
      method: 'POST',
      body: JSON.stringify({ content, fileName, description }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const { data } = await response.json();

    const post: Post = {
      id: data.id,
      path: data.path,
      publishDate: data.publishDate,
      userId: data.userId,
      description,
    };

    return post;
  }

  static async remove(token: string, id: Post['id']) {
    await fetch(`${URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
