import React, { useEffect } from 'react';

export default function PetCard({ pet }) {
  useEffect(() => {
    console.log(pet);
  }, []);

  return <div></div>;
}
