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
import UserPage from './components/UserPage';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [userList, setUserList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [openModal, setIsOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [token, setToken] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (currentUser) {
      setCurrentUser(currentUser);
      setToken(token);
    }
  }, []);

  const addPet = (newPet) => {
    const allPets = [...petList, newPet];
    setPetList(allPets);
  };

  return (
    <AppContext.Provider
      value={{ userList, setUserList, petList, setPetList, openModal, setIsOpenModal, setCurrentUser, currentUser, token, addPet, setToken }}
    >
      <div className='appContainer'>
        <NavBar />
        <Routes>
          <Route path='/' element={currentUser.id ? <LoggedHomePage /> : <NotLoggedHomePage />}></Route>
          <Route
            path='/admin'
            element={
              // <ProtectedRoute currentUser={currentUser}>
              <AdminPage />
              // </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/mypets'
            element={
              // <ProtectedRoute currentUser={currentUser}>
              <MyPetsPage />
              // </ProtectedRoute>
            }
          ></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route
            path='/pet/:petId'
            element={
              // <ProtectedRoute currentUser={currentUser}>
              <PetPage />
              // </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/user/:userId'
            element={
              // <ProtectedRoute currentUser={currentUser}>
              <UserPage />
              // </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
