import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../context/appContext';
import User from './User';
import { getAllUsersApi } from '../api/usersApi';

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const { token } = useContext(AppContext);

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
  }, [token]);
  return <div>{allUsers && allUsers.length > 0 && allUsers.map((user) => <User key={user._id} user={user} />)}</div>;
}
