import { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../App.css';
import {getUserByIdApi,  editUserApi } from '../api/usersApi';

import axios from 'axios';
import AppContext from '../context/appContext';

export default function Profile() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const { currentUser, token } = useContext(AppContext);

  const fetchUserById = async () => {
    try {
      const user = await getUserByIdApi(currentUser.id);
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && currentUser) {
      fetchUserById();
    }
  }, [token]);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, phone } = user;
      const userInfo = { firstName, lastName, email, phone };
      const editedUser = await editUserApi(currentUser.id, userInfo);
      console.log(editedUser);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' placeholder='Enter First Name' value={user.firstName} name='firstName' onChange={handleChange} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' placeholder='Enter Last Name' value={user.lastName} name='lastName' onChange={handleChange} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={user.email} name='email' onChange={handleChange} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='phoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' placeholder='Enter Phone Number' value={user?.phone} name='phone' onChange={handleChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
