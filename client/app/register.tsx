import { AuthService } from '@/services/auth.service';
import { storeToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function RegisterScreen() {
  const navigation = useNavigation<any>(); // eslint-disable-line

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');

  const registerUser = async () => {
    if (password !== password2) {
      alert('Passwords must match');
      return;
    }

    const data = await AuthService.register({
      email,
      password,
      password2,
      username,
    });

    if (!data) return;

    const { token } = data;
    await storeToken(token);

    navigation.navigate('(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <View style={styles.form}>
        <View>
          <Text>E-mail</Text>
          <TextInput
            style={styles.input}
            defaultValue={email}
            onChangeText={(newText) => setEmail(newText)}
            inputMode="email"
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
        <View>
          <Text>Repita sua senha</Text>
          <TextInput
            style={styles.input}
            defaultValue={password2}
            onChangeText={(newText) => setPassword2(newText)}
            secureTextEntry
          />
        </View>
        <View>
          <Text>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            defaultValue={username}
            onChangeText={(newText) => setUsername(newText)}
          />
        </View>
        <Button title="Registrar" onPress={registerUser}></Button>
        <Text>
          Já tem conta?{' '}
          <Text
            onPress={() => {
              navigation.navigate('login');
            }}
          >
            Login
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
