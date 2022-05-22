import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Paper, Box } from '@mui/material';
import AppContext from '../context/appContext';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import '../App.css';
import Button from '@mui/material/Button';
import { getPetByIdApi, adoptPetApi, savePetApi } from '../api/petsApi';

export default function PetsPage() {
  const { token, currentUser } = useContext(AppContext);
  const [pet, setPet] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [fosteredAdopted, setFosteredAdopted] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const { petId } = useParams();
  const getPetById = async () => {
    try {
      const res = await getPetByIdApi(petId);
      setPet(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
      const res = await adoptPetApi(petId, { status: e.target.name });
      const { updatePetStatus, updateUser } = res;
      if (updatePetStatus.acknowledged && updateUser.acknowledged) {
        setFosteredAdopted(e.target.name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savePet = async (e) => {
    try {
      const res = await savePetApi(petId, { action: e.target.name });

      if (res.ok) {
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
