import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import PetCard from './SearchedPets';
import AppContext from '../context/appContext';

export default function PetsPage() {
  const { currentUser } = useContext(AppContext);



  return (
    <div>
      <h1>{currentUser.email}</h1>

    </div>
  );
}
