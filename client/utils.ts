import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  AsyncStorage.setItem('TOKEN', token);
};

export const getToken = async () => {
  return AsyncStorage.getItem('TOKEN');
};

export const clearToken = async () => {
  return AsyncStorage.removeItem('TOKEN');
};
