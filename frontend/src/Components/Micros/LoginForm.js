import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate, Link } from 'react-router-dom';
import {LoginPNG} from '../../asset/.'

import axios from 'axios';
import { Alert } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, []); // Tambahkan array kosong sebagai argumen kedua useEffect untuk memastikan efek hanya dieksekusi sekali

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const authToken = response.data.authorization.token;
      localStorage.setItem('token', authToken);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      if (password === null) {
        setError(error.response.data.errors.password);
      } else {
        setError(error.response.data.errors.password);
        console.log(error.response.data.errors.password);
      }
    }
  };

  return (
    <>
      <div className='bg-dark text-white'>
        <div className='container mx-auto grid grid-cols-12 gap-4' style={{ width: '100vw', height: '100vh' }}>
          <div className='col-span-5'>
            <div className='flex flex-col items-center justify-center h-full'>
              <h1 className='text-[50px] font-bold mb-10'>Login</h1>
              <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full my-5'>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='success'>{message}</Alert>}
                <label className='flex flex-col gap-2'>
                  Email:
                  <input
                    className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white py-2 px-4 rounded-[10px] bg-gray-light'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <div className='grid grid-flow-col justify-stretch gap-5'>
  <label className='flex flex-col gap-2'>
    Password:
    <input
      className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white py-2 px-4 rounded-[10px] bg-gray-light'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </label>
  {error && error.password && <Alert severity='error'>{error.password}</Alert>}
</div>

                <button className='bg-purple py-2 rounded-[10px] font-bold text-white' type='submit'>
                  Login
                </button>
              </form>
              <span>
                Don't have an account?{' '}
                <Link to='/register'>
                  <a href='' className='text-md font-bold'>
                    {' '}
                    Sign Up
                  </a>
                </Link>{' '}
              </span>
            </div>
          </div>
          <div className='col-span-7 flex items-center justify-end'>
            <img src={LoginPNG} alt='' style={{ width: '90%' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
