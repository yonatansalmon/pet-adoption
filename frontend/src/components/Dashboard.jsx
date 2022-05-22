import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import AppContext from '../context/appContext';
import User from './User';
import { getAllUsersApi } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const viewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  const fetchUsers = async () => {
    try {
      const allUsers = await getAllUsersApi();
      console.log(allUsers);
      if (allUsers.length > 0) {
        setAllUsers(allUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token.length > 0) {
      fetchUsers();
    }
  }, []);
  return (
    <>

    <h1 className="usersTitle">Users</h1>
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>

        </tr>
        {allUsers &&
          allUsers.length > 0 &&
          allUsers.map((user) => (
            <tr key={user._id} onClick={(e) => viewUser(user._id)}>
              <td className='petId'>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className='returnPetBtnContainer'>
                <Button className='returnPetBtn'>Make Admin</Button>
              </td>
            </tr>
          ))}
      </thead>
      <tbody></tbody>
    </Table>
    </>
  );
}
