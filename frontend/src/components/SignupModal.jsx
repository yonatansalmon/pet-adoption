import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function SignupModal({ show, handleClose, handleShow }) {

  const [user, setUser] = useState({})


  const handleChange = (e) => {

    setUser({...user, [e.target.name]: e.target.value})

  }
const handleSubmit = () => {

}


  return (
    <Modal show={show} name='signup' onHide={() => handleClose('signup')}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' placeholder='Enter First Name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Last Name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type='tel' placeholder='Enter Phone Number' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formRePassword'>
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type='password' placeholder='Repeat Password' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
