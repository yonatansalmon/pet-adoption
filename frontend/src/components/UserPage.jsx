import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import AppContext from '../context/appContext';
import PetCard from './PetCard';
import '../App.css'
export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [userPets, setUserPets] = useState([])
  const { token } = useContext(AppContext);

  const fetchUserById = async () => {
    const res = await axios.get(`http://localhost:8000/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  const fetUsersPets = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/pets/mypets/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {myAdoptedPets, myFosteredPets,  mySavedPets} = res.data

      setUserPets([...myAdoptedPets, ...myFosteredPets, ...mySavedPets])
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(userId)
    if (token && userId) {
      fetchUserById();
      fetUsersPets();
    }
  }, [token, userId]);

  return (
    <>
    <div className="userDetails">
      <h1>{user.firstName}</h1>
      <p>{user.email}</p>
    </div>


    <div className="usersPets">
      <h1>{user.firstName} Pets</h1>
      {userPets.map(pet => <PetCard pet={pet}/> )}
    </div>
    </>
  );
}
