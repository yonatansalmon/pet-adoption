import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Typography, Container, Link } from '@mui/material';

export default function PetCard({pet}) {
  return (
    <Grid item key={pet} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia component='img' image='https://source.unsplash.com/random' alt='random' />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            Heading
          </Typography>
          <Typography>This is a media card. You can use this section to describe the content.</Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>View</Button>
          <Button size='small'>Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
