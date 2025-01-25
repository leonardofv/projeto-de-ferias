import { clearToken, getToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const names = ['World', 'Cleberson', 'Leonardo'];

export default function HomeScreen() {
  const [counter, setCounter] = useState(0);
  const currentName = names[counter % names.length];
  const navigation = useNavigation<any>(); // eslint-disable-line

  const counterRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    getToken().then((token) => console.log({ token }));
    counterRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);

    return () => clearInterval(counterRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {currentName}! 🗺️</Text>
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
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});
