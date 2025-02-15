import { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Icon name="chevron-right" color="#fff" size={18} />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
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
    bottom: 24,
    justifyContent: 'center',
  },
  postButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
    backgroundColor: 'purple',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
  },
});
