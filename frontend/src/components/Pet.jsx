import React from 'react';
import '../App.css';

export default function Pet({ pet }) {
  return (
    <div className='petContainer'>
      <h4>{pet.name}</h4>
      <p>{pet.adoptionStatus}</p>
      <img src={pet.picture}></img>
    </div>
  );
}
