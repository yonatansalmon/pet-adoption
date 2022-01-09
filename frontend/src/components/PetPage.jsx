import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Paper, Box } from '@mui/material';
import AppContext from '../context/appContext';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import '../App.css';
import Button from '@mui/material/Button';
export default function PetsPage() {
  const { token } = useContext(AppContext);
  const [pet, setPet] = useState({});
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getPetById = async () => {
      const res = await axios.get(`http://localhost:8000/pets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPet(res.data);
    };
    getPetById();
  }, []);

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
          {expanded ?" See More" : 'See Less'}
          </p>
        </div>

        <div className='buttonsContainer '>
          <Button variant='text'>Text</Button>
          <Button variant='contained'>Contained</Button>
          <Button variant='outlined'>Outlined</Button>
        </div>
      </Paper>
    </Container>
  );
}
