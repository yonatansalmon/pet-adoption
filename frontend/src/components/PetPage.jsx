import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Paper, Box } from '@mui/material';
import AppContext from '../context/appContext';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import '../App.css';
import Button from '@mui/material/Button';

export default function PetsPage() {
  const { token, currentUser } = useContext(AppContext);
  const [pet, setPet] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [fosteredAdopted, setFosteredAdopted] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const { petId } = useParams();

  useEffect(() => {
    const getPetById = async () => {
      const res = await axios.get(`http://localhost:8000/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPet(res.data);
    };
    getPetById();
  }, []);

  useEffect(() => {
    if (pet?.savedUsers && pet.savedUsers.includes(currentUser.id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [pet]);

  const adoptPet = async (e) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/pets/${petId}/adopt`,
        { status: e.target.name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { updatePetStatus, updateUser } = res.data;
      if (updatePetStatus.acknowledged && updateUser.acknowledged) {
        setFosteredAdopted(e.target.name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savePet = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/pets/${petId}/save`,
        { action: e.target.name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.ok) {
        setIsSaved(!isSaved);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const expandBio = (e) => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Paper sx={{ width: '100%' }} elevation={4} className='petContainer'>
        <div className='imageContainer'>
          <img src={pet.picture}></img>
        </div>

        <div className='nameTypeContainer'>
          <hr></hr>
          <h2 className='petName'>{pet.name}</h2>
          <h5 className='petBreed'>{pet.breed}</h5>
        </div>

        <div className='petDetailsContainer'>
          <div className='box'>
            <p>
              <b>Color</b>
            </p>
            {pet.color}
            <p></p>
          </div>
          <div className='box'>
            <b>Weight</b>
            <p>{pet.weight}kg</p>
          </div>
          <div className='box'>
            <b>Height</b>
            <p>{pet.height}cm</p>
          </div>
          <div className='box'>
            <b>Hypoallergenic</b>
            <p>{pet.hypoallergenic ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className='petBioContainer'>
          <h4>About {pet.name}</h4>
          <p className={expanded ? 'expanded' : 'bio'}>{pet.bio}</p>
          <p className='seeMore' onClick={expandBio}>
            {expanded ? ' See Less' : 'See More'}
          </p>
        </div>
        <div className='buttonsContainer '>
          {fosteredAdopted !== 'adopted' && (
            <Button variant='contained' name='adopted' onClick={adoptPet}>
              Adopt
            </Button>
          )}
          {fosteredAdopted !== 'fostered' && (
            <Button variant='contained' name='fostered' onClick={adoptPet}>
              Foster
            </Button>
          )}
          {!isSaved ? (
            <Button variant='contained' name='save' onClick={savePet}>
              Save
            </Button>
          ) : (
            <Button variant='contained' name='unsave' onClick={savePet}>
              Un-Save
            </Button>
          )}
        </div>
      </Paper>
    </Container>
  );
}
