import { useState } from 'react';
import React from 'react';
import Search from './Search';
import SearchedPets from './SearchedPets';

export default function SearchPage() {
  const [searchedPets, setSearchedPets] = useState([]);
  return (
    <div>
      <Search setSearchedPets={setSearchedPets} />
      <SearchedPets searchedPets={searchedPets} />
    </div>
  );
}
