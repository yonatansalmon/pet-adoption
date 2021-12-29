import { useContext, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/users/login', user);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate(`/home`);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log In
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={handleInputChange}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            className='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            onChange={handleInputChange}
            margin='normal'
            required
            fullWidth
            className='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant='body2' color='text.secondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://mui.com/'>
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}
