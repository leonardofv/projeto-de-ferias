import { View, Text, StyleSheet } from 'react-native';

type UserProps = {
  id: number;
  userId: number;
  path: string;
  publishDate: string;
  description?: string;
};

export default function Post({
  id,
  userId,
  path,
  publishDate,
  description,
}: UserProps) {
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>ID: {id}</Text>
      <Text>User ID: {userId}</Text>
      <Text>Path: {path}</Text>
      <Text>Publish Date: {publishDate}</Text>
      <Text>Description: {description}</Text>
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
