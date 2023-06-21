import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    try {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    } catch (err) {
      console.log(err);
    }
  };

  const clearToken = () => {
    try {
      localStorage.removeItem('token');
      setToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    setToken: saveToken,
    clearToken,
    token,
  };
}
