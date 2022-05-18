import React, { useContext, useEffect } from 'react';
import AppContext from '../context/appContext';
import Search from './Search';
import '../App.css';
import SearchPage from './SearchPage';
import SearchedPets from './SearchedPets';

export default function LoggedHomePage() {
  const { currentUser, petList } = useContext(AppContext);
  return (
    <>
      <div className='loggedHomePageContainer'>
        <h1>Hello {currentUser.firstName}</h1>
      </div>
      <SearchPage />
    </>
  );
}
