import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const navigate = useNavigate();
  const { setUserList, userList, petList } = useContext(AppContext);
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/users/signup', user);
      if (res.data.insertedId) {
        setUserList([...userList, { _id: res.data.insertedId, ...user }]);
        navigate(`/`);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div >
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                name='repassword'
                label='Re-Password'
                type='repassword'
                id='repassword'
                autoComplete='current-repassword'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/' variant='body2'>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'Built with love by  \n'}
          {' Me.'}
        </Typography>{' '}
      </Box>
    </Container>
  );
}
