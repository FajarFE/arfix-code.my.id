import axios from 'axios';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      setUser(response.data.user);
      const tokenAuth = response.data.authorization;
      setToken(tokenAuth);
      console.log(response.data.user);
      console.log(tokenAuth);
      localStorage.setItem('token', tokenAuth);
    } catch (err) {
      console.log('Login Failed:', err.response.data.message);
      setError(err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setUser(response.data.user);
      const tokenAuth = response.data.authorization.token;
      setToken(tokenAuth);
      localStorage.setItem('token', tokenAuth);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  return { user, token, error, login, logout, register, setToken };
};

export default useAuth;
