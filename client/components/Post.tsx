import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import Icon from '@expo/vector-icons/Feather';

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
      <View style={styles.header}>
        <Text style={styles.publishDate}>
          {formatDistanceToNow(publishDate, {
            locale: ptBR,
            addSuffix: true,
          })}
        </Text>
        <Pressable onPress={() => onRemove?.(id)}>
          <Icon name="trash-2" color="red" size={24} />
        </Pressable>
      </View>
      <Image
        source={{ uri: `${UPLOADS_URL}/${path.replace('\\', '/')}` }}
        style={styles.image}
      />
      <Text>{description}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
