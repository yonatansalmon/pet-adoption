import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../App.css';

export default function PetCard({ pet }) {
  let navigate = useNavigate();


  return (
    <Card onClick={()=>navigate(`/pet/${pet._id}`)} className='petCard'>
      <CardMedia component='img' alt={pet.name} image={pet.picture} sx={{ 'objectFit': 'scale-down', my: 3 }} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {pet.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {pet.adoptionStatus}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <Link to={`/pet/${pet._id}`}>See more</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
