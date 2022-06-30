import axios from 'axios';
import { TokenList, Login } from './entity/login';
import config from '../../config/config';

const autoLogin = async () => {
  const tokenList: TokenList = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken')
  };

  if (tokenList.token === undefined && tokenList.refreshToken === undefined) return false;

  const path = `${config.apiAddress}/autoLogin`;
  try {
    return await axios.post(path, { tokenList }).then((res) => {
      return res.data;
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    }
    return false;
  }
};

const login = (loginForm: Login) => {
  const tokenList: TokenList = {
    token: '123abc',
    refreshToken: '123abc'
  };

  const database: Login = {
    email: 'user1@example.com',
    password: 'user1abc'
  };
  if (JSON.stringify(database) === JSON.stringify(loginForm)) {
    return tokenList;
  }
  return {
    token: undefined,
    refreshToken: undefined
  };
};

export { autoLogin, login };
