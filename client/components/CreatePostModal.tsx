import { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';

type CreatePostModalProps = {
  image: string;
  onCreate: (description?: string) => void;
  onClose: () => void;
};

export default function CreatePostModal({
  image,
  onCreate,
  onClose,
}: CreatePostModalProps) {
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Icon name="x" color="#fff" size={24} />
      </Pressable>
      <View style={styles.actions}>
        <TextInput
          style={styles.description}
          placeholder="Add Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Pressable
          style={styles.postButton}
          onPress={() => onCreate(description)}
        >
          <Text style={styles.postButtonText}>&gt;</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    backdropFilter: 'blur(5px)',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  description: {
    width: '95%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    padding: 10,
    borderRadius: 8,
    color: 'white',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
  },
  postButton: {
    position: 'absolute',
    right: 10,
    width: 32,
    height: 32,
    backgroundColor: 'green',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
  },
});
