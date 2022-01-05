import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import '../App.css'



export default function PetCard({ pet }) {
  return (
       <Card className='petCard' >
      <CardMedia
        component="img"
        alt={pet.name}
   
        image={pet.picture}
        sx={{'object-fit': 'scale-down', my: 3}}
 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.adoptionStatus}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

