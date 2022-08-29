import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export let accessToken: string | null = null;
(async () => {
  const token = await AsyncStorage.getItem('accessToken');
  accessToken = token;
})();

export const setAccessToken = (accToken: string) => {
  accessToken = accToken;
  AsyncStorage.setItem('accessToken', accToken);
};

export const removeAccessToken = () => {
  accessToken = null;
  AsyncStorage.removeItem('accessToken');
};

client.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);
