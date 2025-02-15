import Post from '@/components/Post';
import { Post as IPost, PostService } from '@/services/post.service';
import { clearToken, getToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

export default function HomeScreen() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const navigation = useNavigation<any>(); // eslint-disable-line

  const counterRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    getToken()
      .then((token) => {
        if (!token) return Promise.resolve([]);
        return PostService.fetchPosts(token);
      })
      .then((data) => setPosts(data))
      .finally(() => setIsLoadingPosts(false));

    return () => clearInterval(counterRef.current);
  }, []);

  return (
    <View style={styles.container}>
      {isLoadingPosts ? (
        <Text style={styles.noFoundPostsTitle}>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noFoundPostsTitle}>No posts found.</Text>
          }
          renderItem={({ item }) => (
            <Post
              id={item.id}
              userId={item.userId}
              path={item.path}
              publishDate={item.publishDate}
              description={item.description}
            />
          )}
        />
      )}
      <Button
        title="Logout"
        onPress={() => {
          clearToken();
          navigation.replace('login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  post: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  noFoundPostsTitle: {
    color: 'white',
  },
});
