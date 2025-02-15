import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { Post as IPost } from '@/services/post.service';

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
      <Text style={styles.publishDate}>
        {formatDistanceToNow(publishDate, {
          locale: ptBR,
          addSuffix: true,
        })}{' '}
      </Text>
      <Image
        source={{ uri: `${UPLOADS_URL}/${path.replace('\\', '/')}` }}
        style={styles.image}
      />
      <Text>{description}</Text>
      <Button title="Remove" onPress={() => onRemove?.(id)} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 400,
  },
  publishDate: {
    textAlign: 'right',
  },
});
