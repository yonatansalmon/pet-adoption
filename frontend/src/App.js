import './App.css';
import axios, { AxiosResponse } from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AppContext from './context/appContext';

import NavBar from './components/NavBar';
import NotLoggedHomePage from './components/NotLoggedHomePage';
import LoggedHomePage from './components/LoggedHomePage';
import Profile from './components/Profile';
import PetPage from './components/PetPage';

import React, { useContext, useState, useEffect } from 'react';
import AdminPage from './components/AdminPage';
import MyPetsPage from './components/MyPetsPage';

function App() {
  const [userList, setUserList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [openModal, setIsOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

  useEffect(() => {
    async function getAllPets() {
      try {
        const tokenLocal = JSON.parse(localStorage.getItem('token'));
        setToken(tokenLocal);

        const res = await axios.get('http://localhost:8000/pets/all', { headers: { Authorization: `Bearer ${tokenLocal}` } });

        setPetList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllPets();
  }, []);

  const addPet = (newPet) => {
    const allPets = [...petList, newPet];
    setPetList(allPets);
  };

  return (
    <AppContext.Provider
      value={{ userList, setUserList, petList, setPetList, openModal, setIsOpenModal, setCurrentUser, currentUser, token, addPet }}
    >
      <div className='appContainer'>
        <NavBar />
        <Routes>
          <Route path='/' element={currentUser.id ? <LoggedHomePage /> : <NotLoggedHomePage />}></Route>
          <Route path='/admin' element={<AdminPage />}></Route>
          <Route path='/mypets' element={<MyPetsPage />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/pet/:petId' element={<PetPage />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
