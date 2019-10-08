import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {MASTER_KEY} from 'react-native-dotenv';
import {AUTH_TOKEN} from '../constants';

export default function HttpService(baseUrl = 'http://0.0.0.0:9000') {
  axios.defaults.baseURL = baseUrl;
  axios.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem(AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if(config.data) {
        config.data.access_token = MASTER_KEY;
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
      console.log("TCL: makeRequest -> e", e)
      return Promise.reject(e);
    }
  }

  return {
    makeRequest,
  };
}
