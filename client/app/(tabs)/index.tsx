import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import Post from '@/components/Post';
import CreatePostModal from '@/components/CreatePostModal';
import { Post as IPost, PostService } from '@/services/post.service';
import { clearToken, getToken } from '@/utils';

export default function HomeScreen() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const imageName = useRef('');

  const tokenRef = useRef('');

  const navigation = useNavigation<any>(); // eslint-disable-line

  const counterRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    getToken()
      .then((token) => {
        if (!token) return Promise.resolve([]);
        tokenRef.current = token;
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
              onRemove={async () => {
                await PostService.remove(tokenRef.current, item.id);
                setPosts((oldPosts) =>
                  oldPosts.filter((p) => p.id !== item.id),
                );
              }}
            />
          )}
        />
      )}
      <View style={styles.actions}>
        <Button
          title="Create"
          onPress={async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images', 'videos'],
              aspect: [9, 16],
              quality: 1,
            });
            if (result.canceled) return;

            const [asset] = result.assets;
            setImage(asset.uri);
            imageName.current = asset.fileName ?? '';
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            clearToken();
            navigation.replace('login');
          }}
        />
      </View>

      {image && (
        <CreatePostModal
          image={image}
          onCreate={async (description) => {
            const post = await PostService.create(
              tokenRef.current as string,
              image,
              imageName.current,
              description,
            );
            setPosts([post, ...posts]);
            setImage(null);
          }}
          onClose={() => setImage(null)}
        />
      )}
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
  noFoundPostsTitle: {
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});
