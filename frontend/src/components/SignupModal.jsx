import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { signUpApi } from '../api/usersApi';

export default function SignupModal({ show, handleClose, handleShow }) {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { insertedId, acknowledged } = await signUpApi(user)
      if (insertedId && acknowledged) {
        handleClose('signup');
        handleShow('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} name='signup' onHide={() => handleClose('signup')}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' placeholder='Enter First Name' name='firstName' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Last Name' name='lastName' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' name='email' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type='tel' placeholder='Enter Phone Number' name='phone' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' name='password' onChange={handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formRePassword'>
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type='password' placeholder='Repeat Password' name='repassword' onChange={handleChange} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
