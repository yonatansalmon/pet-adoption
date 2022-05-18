import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/appContext';
import Pet from './Pet';

export default function MyPetsPage() {
  const [myPets, setMyPets] = useState([]);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    const fetchMyPets = async () => {
      const res = await axios.get(`http://localhost:8000/pets/mypets/${currentUser.id}`);
      setMyPets(res.data);
    };
    if (currentUser.id) {
      fetchMyPets();
    }
  }, [currentUser]);

  return (
    <div className='myPetsContainer'>
      <h1>Saved Pets</h1>
      <div className='saved'>{myPets.mySavedPets && myPets.mySavedPets.length > 0 && myPets.mySavedPets.map((pet) => <Pet key={pet._id} pet={pet} />)}</div>
      <h1>Adopted Pets</h1>
      <div className='adopted'>{myPets.mySavedPets && myPets.mySavedPets.length > 0 && myPets.mySavedPets.map((pet) => <Pet key={pet._id} pet={pet} />)}</div>
      <h1>Fostered Pets</h1>
      <div className='fostered'>
        {myPets.myFosteredPets && myPets.myFosteredPets.length > 0 && myPets.myFosteredPets.map((pet) => <Pet key={pet._id} pet={pet} />)}
      </div>
    </div>
  );
}
