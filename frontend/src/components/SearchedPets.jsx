import React, { useEffect } from 'react';
import PetCard from './PetCard';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function SearchedPets({ searchedPets }) {
  return (
    <Container>
      <div className='petCardsContainer'>
        {searchedPets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </Container>
  );
}
