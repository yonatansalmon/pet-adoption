import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/usersApi';

export default function LoginModal({ show, handleClose, handleShow }) {
  let navigate = useNavigate();

  const [user, setUser] = useState({});
  const { setCurrentUser, setToken, logInUser } = useContext(AppContext);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, firstName, token } = await loginApi(user);
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('currentUser', JSON.stringify({ id, firstName }));
        setCurrentUser({ id, firstName });
        setToken(token);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={show} name='login' onHide={() => handleClose('login')}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' name='email' onChange={handleChange} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' name='password' autoComplete='current-passsword' onChange={handleChange} />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
