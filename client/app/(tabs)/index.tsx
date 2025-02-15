import { Post, PostService } from '@/services/post.service';
import { clearToken, getToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
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
            <View style={styles.post}>
              <Text style={styles.postTitle}>ID: {item.id}</Text>
              <Text>User ID: {item.userId}</Text>
              <Text>Path: {item.path}</Text>
              <Text>Publish Date: {item.publishDate}</Text>
              <Text>Description: {item.description}</Text>
            </View>
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
