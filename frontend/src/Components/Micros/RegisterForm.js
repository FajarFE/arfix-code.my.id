import React, { useState } from 'react';
import useAuth from './useAuth';
import {RegisterPNG} from '../../asset/index';
import { Alert } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    await axios.post(`${baseURL}/api/register`, formData)
      .then((response) => {
       setTimeout(() => {
          navigate('/login'); 
       },2000);
       console.log(response.data);     
       setErrorMessage(response.data.message);
      }).catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.data.errors);
        setError(error.response.data.errors);
       
      });
  };
  

  return (
  <>
  <ul>
    
  </ul>
  <div className='bg-dark h-screen w-screen overflow-hidden  flex justify-center items-center '>
    <div className='container mx-auto '>
    <h1 className='text-[50px] font-bold -mb-16 sm:hidden  text-white w-full flex justify-center items-center'>Login</h1>
  <div className="grid grid-cols-12 gap-4" >
    <div className="col-span-12 lg:col-span-5 order-last lg:order-first ">
    <h1 className='text-[50px] font-bold hidden lg:flex -mb-32 mt-20 text-white w-full flex-col flex justify-center items-center'>
      Login
    </h1>
      <div className="flex flex-col items-center justify-center h-full   lg:w-full">
     
      <form onSubmit={handleSubmit} className='flex flex-col w-[70%] lg:w-full gap-5  my-5'>
      {error && (
      <Alert severity="error">
        {Object.keys(error).map((key) =>
        error[key].map((error) => (
          <li key={`${key}-${error}`}>{error}</li>
        ))
      )}
      </Alert>
      )}
      {errorMessage && <Alert severity='success'>{errorMessage}</Alert>} {/* menampilkan pesan error jika terjadi error */}
      <label className='flex flex-col gap-2'>
        <p className='text-white'>
        Name:
        </p>
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label  >
      <label className='flex flex-col gap-1'>
      <p className='text-white'>
        Email:
        </p>
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
     
      <label className='flex flex-row w-full flex-warp gap-2' >
        <div className='w-[50%]'>
        <p className='text-white text-sm'>
        Password:
        </p>
        <input className='focus:outline-gray w-full focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
     <div className='w-[50%]'>
     <p className='text-white text-sm'>
        Confirm Password:
        </p>
        <input className='focus:outline-gray w-full focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light'
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
     </div>
      </label>
      
          
      <button className='bg-purple py-2 rounded-[10px] font-bold text-white' type="submit">Register</button>
    </form>
        <span className='text-white'>Dont you have an Account? <Link to="/login" className='text-[#ffffff]'><a href="" className='text-md font-bold '> Sign In</a></Link> </span>
        </div>
    </div>
    <div className="col-span-12 -mb-10 mt-10 lg:col-span-7 flex items-center justify-center lg:justify-end">
      <img src={RegisterPNG} alt="" className='w-[100%] lg:w-[90%]'/>
    </div>
  </div>
    </div>
  </div>
 
  </>
  );
};

export default RegisterForm;
