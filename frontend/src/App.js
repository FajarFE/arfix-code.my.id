import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Components/Macros/RegisterPage';
import Login from './Components/Micros/LoginForm';
import LandingPage from './Components/Macros/LandingPage';
import FormArtikel from './Components/Micros/FormArtikel';
import Sidebar from './Components/Micros/Sidebar';
import LibraryArtikel from './Components/Micros/LibraryArtikel';
import axios from 'axios';
import Dashboard from './Components/Macros/Dashboard';
import EditArtikel from './Components/Micros/Edit';
import { Edit } from '@mui/icons-material';
import NextPage from './Components/Macros/NextPage';
import Jodit from './Components/Micros/Jodit';
import EditUser from './Components/Micros/EditUser';
import CategoryPage from './Components/Macros/CategoryPage';
import Searching from './Components/Macros/Searching';
import { Provider } from 'react-redux';
import store from './Components/Store/Store';
import Mencoba from './Components/Micros/Mencoba';
import Loading from './Components/Micros/Loading';
const App = () => {
  return (
<Provider store={store}>

      <Routes>
      <Route path="/search/:searchTerm" element={<Searching/>}/>
      <Route path='/:title/:id' element={<NextPage/>}/> 
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:name/:id/:tipe_name" element={<CategoryPage/>}/>  
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        >
          <Route exact index element={<LibraryArtikel />} />
          <Route path="form" element={<FormArtikel />} />
          <Route path=":id/edit" element={<EditArtikel />} />
          <Route path=":name" element={<EditUser/>}/>
        </Route>
      </Routes>
</Provider>
  
  );
};

export default App;
