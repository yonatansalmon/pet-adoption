import React, { useContext, useEffect } from 'react';
import AppContext from '../context/appContext';
import Search from './Search';
import '../App.css';
import SearchPage from './SearchPage';

export default function LoggedHomePage() {
  const { currentUser } = useContext(AppContext);
  return (
    <>
      <div className='loggedHomePageContainer'>
        <h1>Logged Homepage {currentUser.firstName}</h1>
      </div>
      <SearchPage />
    </>
  );
}
