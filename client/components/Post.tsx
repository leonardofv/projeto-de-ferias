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
    <View style={styles.container}>
      <Text style={styles.title}>ID: {id}</Text>
      <Text>User ID: {userId}</Text>
      <Text>Path: {path}</Text>
      <Text>Publish Date: {publishDate}</Text>
      <Text>Description: {description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});
