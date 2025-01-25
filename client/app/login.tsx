import { AuthService } from '@/services/auth.service';
import { storeToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function LoginScreen() {
  const navigation = useNavigation<any>(); // eslint-disable-line

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const data = await AuthService.login(emailOrUsername, password);
    if (!data) return;

    const { token } = data;
    await storeToken(token);

    navigation.navigate('(tabs)');
    alert('Successfully Logged In ✅');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <View>
          <Text>E-mail</Text>
          <TextInput
            style={styles.input}
            defaultValue={emailOrUsername}
            onChangeText={(newText) => setEmailOrUsername(newText)}
          />
        </View>
        <View>
          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            defaultValue={password}
            onChangeText={(newText) => setPassword(newText)}
            secureTextEntry
          />
        </View>
        <Button title="Login" onPress={loginUser}></Button>
        <Text>
          Ainda não tem conta?{' '}
          <Text
            onPress={() => {
              navigation.navigate('register');
            }}
          >
            Registrar
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 12,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    padding: 4,
    borderRadius: 3,
  },
  form: {
    flex: 1,
    marginTop: 24,
    gap: 12,
    justifyContent: 'center',
  },
});
