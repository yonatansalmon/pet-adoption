import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/appContext';
import Pet from './Pet';
import { getUserPetsApi } from '../api/petsApi';

export default function MyPetsPage() {
  const [myPets, setMyPets] = useState([]);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    const fetchMyPets = async () => {
      const usersPets = await getUserPetsApi(currentUser.id);
      console.log(usersPets);
      setMyPets(usersPets);
    };
    if (currentUser.id) {
      fetchMyPets();
    }
  }, [currentUser]);

  return (
    <div className='myPetsContainer'>
      <h1>Saved Pets</h1>
      <div className='saved'>
        {myPets.mySavedPets && myPets.mySavedPets.length > 0 && myPets.mySavedPets.map((pet) => <Pet key={pet._id} pet={pet} />)}
      </div>
      <h1>Adopted Pets</h1>
      <div className='adopted'>
        {myPets.myAdoptedPets && myPets.myAdoptedPets.length > 0 && myPets.myAdoptedPets.map((pet) => <Pet key={pet._id} pet={pet} />)}
      </div>
      <h1>Fostered Pets</h1>
      <div className='fostered'>
        {myPets.myFosteredPets && myPets.myFosteredPets.length > 0 && myPets.myFosteredPets.map((pet) => <Pet key={pet._id} pet={pet} />)}
      </div>
    </div>
  );
}
