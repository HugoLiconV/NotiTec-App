import {MASTER_KEY} from 'react-native-dotenv';
import HttpService from './HttpService';
import {encode as btoa} from 'base-64';

function AuthService() {
  return {
    login: async (email, password) => {
      const basicAuth = `Basic ${btoa(email + ':' + password)}`;
      return HttpService().makeRequest({
        url: '/auth',
        method: 'post',
        data: {
          access_token: MASTER_KEY,
        },
        options: {
          headers: {Authorization: basicAuth},
        },
      });
    },
  };
}

export default AuthService;
