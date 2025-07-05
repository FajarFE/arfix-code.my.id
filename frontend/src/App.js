import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Macros/RegisterPage';
import Login from './Components/Micros/LoginForm';
import LandingPage from './Components/Macros/LandingPage';
import FormArtikel from './Components/Micros/FormArtikel';
import LibraryArtikel from './Components/Micros/LibraryArtikel';

import Dashboard from './Components/Macros/Dashboard';
import EditArtikel from './Components/Micros/Edit';

import NextPage from './Components/Macros/NextPage';

import EditUser from './Components/Micros/EditUser';
import CategoryPage from './Components/Macros/CategoryPage';
import Searching from './Components/Macros/Searching';
import { Provider } from 'react-redux';
import store from './Components/Store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/search/:searchTerm" element={<Searching />} />
        <Route path="/:title/:id" element={<NextPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:name/:id/:tipe_name" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route exact index element={<LibraryArtikel />} />
          <Route path="form" element={<FormArtikel />} />
          <Route path=":id/edit" element={<EditArtikel />} />
          <Route path=":name" element={<EditUser />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
