import { useEffect, useState, useContext } from 'react';
import '../App.css';
import { Table, Button, Spinner } from 'react-bootstrap';
import AppContext from '../context/appContext';
import { getUserPetsApi } from '../api/petsApi';
import { useNavigate } from 'react-router-dom';

export default function MyPetsPage() {
  const [myPets, setMyPets] = useState([]);
  const { currentUser, isLoading, setIsLoading, timeOut } = useContext(AppContext);
  const navigate = useNavigate();

  const viewPet = (petId) => {
    navigate(`/pet/${petId}`);
  };

  const fetchMyPets = async () => {
    const usersPets = await getUserPetsApi(currentUser.id);
    setMyPets(usersPets);
    timeOut();
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetchMyPets();
    }
  }, [currentUser]);



  return (
    <div className='myPetsContainer'>
      {!isLoading ? (
        <>
          <h1>Saved Pets</h1>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myPets.mySavedPets &&
                myPets.mySavedPets.length > 0 &&
                myPets.mySavedPets.map((pet) => (
                  <tr key={pet._id} onClick={(e) => viewPet(pet._id)}>
                    <td className='petId'>{pet._id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>{pet.adoptionStatus}</td>
                    <td className='returnPetBtnContainer'>
                      <Button className='returnPetBtn'>Unsave Pet</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <h1>Adopted Pets</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myPets.myAdoptedPets &&
                myPets.myAdoptedPets.length > 0 &&
                myPets.myAdoptedPets.map((pet) => (
                  <tr key={pet._id}>
                    <td className='petId'>{pet._id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>{pet.adoptionStatus}</td>
                    <td className='returnPetBtnContainer'>
                      <Button className='returnPetBtn'>Return Pet</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <h1>Fostered Pets</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myPets.myFosteredPets &&
                myPets.myFosteredPets.length > 0 &&
                myPets.myFosteredPets.map((pet) => (
                  <tr key={pet._id}>
                    <td className='petId'>{pet._id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>{pet.adoptionStatus}</td>
                    <td className='returnPetBtnContainer'>
                      <Button className='returnPetBtn'>Return Pet</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Spinner className='spinner' animation='border' variant='primary' />
      )}
    </div>
  );
}
