import './App.css';
import axios, { AxiosResponse } from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AppContext from './context/appContext';
import PetsPage from './components/PetsPage';

import NavBar from './components/NavBar';
import NotLoggedHomePage from './components/NotLoggedHomePage';
import LoggedHomePage from './components/LoggedHomePage';
import Profile from './components/Profile';

import React, { useContext, useState, useEffect } from 'react';

function App() {
  const [userList, setUserList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [openModal, setIsOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function getCurrentUser() {
      const res = await axios.get('http://localhost:8000/users');
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    async function getAllPets() {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const res = await axios.get('http://localhost:8000/pets/all', { headers: { Authorization: `Bearer ${token}` } });
        setPetList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(currentUser);
    getAllPets();
  }, []);

  return (
    <AppContext.Provider value={{ userList, setUserList, petList, setPetList, openModal, setIsOpenModal, setCurrentUser, currentUser }}>
      <div className='appContainer'>
        <NavBar />
        <Routes>
          <Route path='/' element={currentUser.email ? <LoggedHomePage /> : <NotLoggedHomePage />}></Route>
          <Route path='/mypets' element={<PetsPage />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
