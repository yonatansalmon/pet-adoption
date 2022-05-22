import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import AppContext from '../context/appContext';
import { Table, Button } from 'react-bootstrap';
import '../App.css';
import { getUserByIdApi } from '../api/usersApi';
import { getUserPetsApi } from '../api/petsApi';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [userPets, setUserPets] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const viewPet = (petId) => {
    navigate(`/pet/${petId}`);
  };

  const fetchUserById = async () => {
    try {
      const user = await getUserByIdApi(userId);
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersPets = async () => {
    try {
      const res = await getUserPetsApi(userId, token);
      console.log(res);
      const { myAdoptedPets, myFosteredPets, mySavedPets } = res;

      setUserPets([...myAdoptedPets, ...myFosteredPets, ...mySavedPets]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchUserById();
      fetchUsersPets();
    }
  }, [token, userId]);

  return (
    <>
      <div className='userDetails'>
        <h1>User Details</h1>
        <h1>{user.firstName}</h1>
        <p>{user.email}</p>
      </div>

      <div className='usersPets'>
        <h1>{user.firstName} Pets</h1>

        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userPets &&
              userPets.length > 0 &&
              userPets.map((pet) => (
                <tr key={pet._id} onClick={(e) => viewPet(pet._id)}>
                  <td className='petId'>{pet._id}</td>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.adoptionStatus}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
