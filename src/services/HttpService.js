import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_TOKEN} from '../constants';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-tec-app.herokuapp.com/'
    : 'http://192.168.1.70:9000';

export default function HttpService(baseUrl = BASE_URL) {
  axios.defaults.baseURL = baseUrl;
  axios.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem(AUTH_TOKEN);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  async function makeRequest({url, method = 'get', data, options}) {
    try {
      const response = await axios[method](url, data, options);
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return {
    makeRequest,
  };
}
