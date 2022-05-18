import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function User({ user }) {
  let navigate = useNavigate();

  const viewUser = () => {
    navigate(`/user/${user._id}`);
  };
  return (
    <div className='usersContainer'>
      <h5>
        Name: {user.firstName} {user.lastName}
      </h5>
      <p>email: {user.email}</p>
      <i onClick={viewUser}>View User</i>
    </div>
  );
}
