import './App.css';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AppContext from './context/appContext';
import PetsPage from './components/PetsPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Files from './components/Files';

import React, { useContext, useState, useEffect } from 'react';

function App() {
  const [userList, setUserList] = useState([]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    async function getAllPets() {
      try {
        const res = await axios.get('http://localhost:8000/pets');
        console.log(res.data);
        setPetList([...petList, res.data]);
      } catch (err) {
        console.log(err);
      }
    }
    getAllPets();
  }, []);

  return (
    <AppContext.Provider value={{ userList, setUserList, petList, setPetList }}>
      <div className='appContainer'>
        <NavBar />
        <Routes>
          <Route path='/' element={<LogIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' element={<Files />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
