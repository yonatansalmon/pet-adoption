import './App.css';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AppContext from './context/appContext';
import PetsPage from './components/PetsPage';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

import React, { useContext, useState, useEffect } from 'react';

function App() {
  const [userList, setUserList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [openModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function getAllPets() {
      try {
        const res = await axios.get('http://localhost:8000/pets');
        console.log(res.data);
        setPetList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllPets();
  }, []);

  return (
    <AppContext.Provider value={{ userList, setUserList, petList, setPetList, openModal, setIsOpenModal }}>
      <div className='appContainer'>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/home' element={<PetsPage />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
