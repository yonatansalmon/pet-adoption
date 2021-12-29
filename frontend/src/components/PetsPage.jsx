import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Typography, Container, Link } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PetCard from './PetCard';
import AppContext from '../context/appContext';

export default function PetsPage() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    console.log(appContext);
  });

  return (
    <div>
      <Grid container spacing={4}>
        {appContext.petList.map((pet) => (
          <PetCard pet={pet} />
        ))}
      </Grid>
    </div>
  );
}
