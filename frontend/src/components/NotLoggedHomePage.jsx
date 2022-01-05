import React, { useState, useContext, useEffect } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import AppContext from '../context/appContext';
import { Button, Container } from 'react-bootstrap';
import '../App.css';

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignup] = useState(false);

  const handleClose = (action) => {
    if (action === 'login') {
      setShowLogin(false);
    } else if (action === 'signup') {
      setShowSignup(false);
    }
  };
  const handleShow = (action) => {
    if (action === 'login') {
      setShowLogin(true);
    } else if (action === 'signup') {
      setShowSignup(true);
    }
  };

  return (
    <Container>
      <div className='headerContainer'>
        <h1>Welcome to Pet Adoption</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iusto incidunt consequatur, eos asperiores numquam vero nam quo enim nobis
          optio aut sequi similique temporibus modi quibusdam nesciunt quos. Corporis, omnis perspiciatis culpa molestiae possimus, architecto
          delectus itaque quam officiis, maiores nihil eligendi facere nostrum soluta amet! Mollitia, explicabo nihil?
        </p>
      </div>
      <div className='buttonContainer'>
        <Button variant='primary' name='login' className='login' onClick={() => handleShow('login')}>
          Log In
        </Button>
        <Button variant='primary' name='signup' className='signup' onClick={() => handleShow('signup')}>
          Sign Up
        </Button>
        <LoginModal handleClose={handleClose} show={showLogin} handleShow={handleShow} />
        <SignupModal handleClose={handleClose} show={showSignUp} handleShow={handleShow} />
      </div>
    </Container>
  );
}
