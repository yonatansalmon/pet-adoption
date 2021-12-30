import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import PetCard from './PetCard';
import AppContext from '../context/appContext';

export default function PetsPage() {
  const { petList } = useContext(AppContext);

  return (
    <div>
      <h1>Pets Page</h1>

    </div>
  );
}
