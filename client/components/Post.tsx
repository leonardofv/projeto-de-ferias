import { Post as IPost } from '@/services/post.service';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const UPLOADS_URL = process.env.EXPO_PUBLIC_UPLOADS_URL;

type UserProps = {
  id: number;
  userId: number;
  path: string;
  publishDate: string;
  description?: string;
  onRemove?: (id: IPost['id']) => void;
};

export default function Post({
  id,
  path,
  publishDate,
  description,
  onRemove,
}: UserProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ID: {id}</Text>
      <Image
        source={{ uri: `${UPLOADS_URL}/${path.replace('\\', '/')}` }}
        style={styles.image}
      />
      <Text>Publish Date: {publishDate}</Text>
      <Text>Description: {description}</Text>
      <Button title="Remove" onPress={() => onRemove?.(id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: 400,
  },
  title: {
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
  },
});
