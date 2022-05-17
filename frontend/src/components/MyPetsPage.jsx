import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/appContext';

export default function MyPetsPage() {
  const [myPets, setMyPets] = useState([]);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    const fetchMyPets = async () => {
      const res = await axios.get(`http://localhost:8000/pets/mypets/${currentUser.id}`);
      console.log(res.data);
    };
    if (currentUser.id) {
      fetchMyPets();
    }
  }, [currentUser]);

  return (
    <div className='myPetsContainer'>
      <div className='saved'></div>
      <div className='adopted'></div>
      <div className='fostered'></div>
    </div>
  );
}
