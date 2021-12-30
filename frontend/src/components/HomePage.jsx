import React, { useState, useContext } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import AppContext from '../context/appContext';
import { Button } from 'react-bootstrap';
import '../App.css'

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignup] = useState(false);

  const handleClose = (action) => {
    if (action === 'login') {
      setShowLogin(false);
    } else {
      setShowSignup(false);
    }
  };
  const handleShow = (action) => {
    console.log(action);
    if (action === 'login') {
      setShowLogin(true);
    } else {
      setShowSignup(true);
    }
  };
  return (
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
  );
}
