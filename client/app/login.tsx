import { AuthService } from '@/services/auth.service';
import { storeToken } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-family: 'Lato';
`;

const Input = styled.TextInput`
  border-color: #dcdcdc;
  border-width: 1px;
  border-style: solid;
  padding: 12px;
  border-radius: 3px;
  outline-color: rgb(255, 77, 109, 0.3);
  font-family: 'Lato';
`;

const RegisterLink = styled(StyledText)`
  color: #ff4d6d;
  text-decoration-line: underline;
`;

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.pinkBackground}
          source={require('../assets/images/pink-background.jpg')}
        />
        <Text style={styles.title}>Login</Text>
        <StyledText style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </StyledText>
      </View>
      <View style={styles.form}>
        <View>
          <StyledText>E-mail ou Nome de Usuário</StyledText>
          <Input
            style={styles.input}
            defaultValue={emailOrUsername}
            onChangeText={(newText: string) => setEmailOrUsername(newText)}
          />
        </View>
        <View>
          <StyledText>Senha</StyledText>
          <Input
            style={styles.input}
            defaultValue={password}
            onChangeText={(newText: string) => setPassword(newText)}
            secureTextEntry
          />
        </View>
        <Button color="#ff4d6d" title="Login" onPress={loginUser} />
        <StyledText>
          Ainda não tem conta?{' '}
          <RegisterLink
            onPress={() => {
              navigation.navigate('register');
            }}
          >
            Registre-se aqui.
          </RegisterLink>
        </StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 300,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    padding: 12,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
    color: 'white',
  },
  container: {
    backgroundColor: '#fff0f3',
    flex: 1,
  },
  input: {
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 12,
    borderRadius: 3,
  },
  form: {
    flex: 1,
    marginTop: 24,
    gap: 12,
    justifyContent: 'center',
    padding: 12,
  },
  pinkBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    filter: 'brightness(0.8)',
  },
});
