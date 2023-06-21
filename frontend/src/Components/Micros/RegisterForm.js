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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    await axios.post('http://localhost:8000/api/register', formData)
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
  <div className='bg-dark text-white'>
  <div className="container mx-auto grid grid-cols-12 gap-4" style={{width:"100vw",height:"100vh"}}>
    <div className="col-span-5">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className='text-[50px] font-bold mb-10'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full my-5'>
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
        Name:
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label  >
      <label className='flex flex-col gap-2'>
        Email:
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <div className="grid grid-flow-col justify-stretch gap-5">
      <label className='flex flex-col gap-2' >
        Password:
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className='flex flex-col gap-2' >
        Confirm Password:
        <input className='focus:outline-gray focus:outline-[3px] focus:outline focus:bg-white  py-2 px-4 rounded-[10px] bg-gray-light'
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </label>
      </div>
      <button className='bg-purple py-2 rounded-[10px] font-bold text-white' type="submit">Register</button>
    </form>
        <span>Dont you have an Account? <Link to="/login"><a href="" className='text-md font-bold'> Sign In</a></Link> </span>
        </div>
    </div>
    <div className="col-span-7 flex items-center justify-end">
      <img src={RegisterPNG} alt="" style={{width:"90%"}}/>
    </div>
  </div>
  </div>
 
  </>
  );
};

export default RegisterForm;
