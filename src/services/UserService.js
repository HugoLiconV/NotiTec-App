import {MASTER_KEY} from 'react-native-dotenv';
import HttpService from './HttpService';
import {encode as btoa} from 'base-64';

function UserService() {
  return {
    createAccount: (email, password, name, career) => {
      return HttpService().makeRequest({
        url: '/users',
        method: 'post',
        data: {
          email,
          name,
          password,
          career,
          access_token: MASTER_KEY,
        },
      });
    },
    me() {
      return HttpService().makeRequest({
        url: '/users/me',
      });
    },
    updateUser(id, name, career, picture) {
      return HttpService().makeRequest({
        url: `/users/${id}`,
        method: 'put',
        data: {
          name,
          career,
          picture,
        },
      });
    },
    updatePassword(id, email, currentPassword, newPassword) {
      const basicAuth = `Basic ${btoa(email + ':' + currentPassword)}`;
      return HttpService().makeRequest({
        url: `/users/${id}/password`,
        method: 'put',
        data: {
          password: newPassword,
        },
        options: {
          headers: {Authorization: basicAuth},
        },
      });
    },
  };
}

export default UserService;
