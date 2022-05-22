import React, { useContext, useEffect } from 'react';
import AppContext from '../context/appContext';
import Search from './Search';
import '../App.css';
import SearchPage from './SearchPage';
import SearchedPets from './SearchedPets';
import { getAllPetsApi } from '../api/petsApi.js';

export default function LoggedHomePage() {
  const { currentUser, petList, setPetList, token } = useContext(AppContext);

  async function getAllPets() {
    try {
      const allPets = await getAllPetsApi(token);
      setPetList(allPets);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getAllPets();
    }
  }, [token]);

  return (
    <>
      <div className='loggedHomePageContainer'>
        <h1>Hello {currentUser.firstName}</h1>
      </div>
      <SearchPage />
    </>
  );
}
