export interface Post {
  id: number;
  userId: number;
  path: string;
  publishDate: string;
  description: string;
}

export class PostService {
  static async fetchPosts(token: string): Promise<Post[]> {
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL;
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
}
