import HttpService from './HttpService';

function UserService() {
  return {
    createAccount: async (email, password, name, career) => {
      return HttpService().makeRequest({
        url: '/users',
        method: 'post',
        data: {
          email,
          name,
          password,
          career,
        },
      });
    },
  };
}

export default UserService;
