import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/Feather';

import Post from '@/components/Post';
import CreatePostModal from '@/components/CreatePostModal';
import { Post as IPost, PostService } from '@/services/post.service';
import { clearToken, getToken } from '@/utils';

export default function HomeScreen() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const imageNameRef = useRef('');
  const tokenRef = useRef('');
  const counterRef = useRef<NodeJS.Timeout>();

  const navigation = useNavigation<any>(); // eslint-disable-line

  const createPost = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [9, 16],
      quality: 1,
    });
    if (result.canceled) return;

    const [asset] = result.assets;
    setImage(asset.uri);
    imageNameRef.current = asset.fileName ?? '';
  };

  const logout = () => {
    clearToken();
    navigation.replace('login');
  };

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
      <Text style={styles.myPostsText}>My Posts</Text>
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={createPost}>
          <Icon name="plus" color="#fff" size={24} />
        </Pressable>
        <Pressable style={styles.actionButton} onPress={logout}>
          <Icon name="log-out" color="#fff" size={24} />
        </Pressable>
      </View>
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

      {image && (
        <Modal transparent visible>
          <CreatePostModal
            image={image}
            onCreate={async (description) => {
              const post = await PostService.create(
                tokenRef.current as string,
                image,
                imageNameRef.current,
                description,
              );
              setPosts([post, ...posts]);
              setImage(null);
            }}
            onClose={() => setImage(null)}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 48,
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
    width: '100%',
    gap: 8,
    position: 'fixed',
    top: 20,
    right: 16,
  },
  myPostsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 8,
  },
  actionButton: {
    padding: 6,
  },
});
