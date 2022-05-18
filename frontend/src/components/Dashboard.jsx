import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../context/appContext';
import User from './User';


export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const { token } = useContext(AppContext);


  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/users/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.length > 0) {
      setAllUsers(res.data);
    }
  };
  useEffect(() => {
    if (token.length > 0) {
      fetchUsers();
    }
  }, [token]);
  return <div>{allUsers && allUsers.length > 0 && allUsers.map((user) => <User key={user._id} user={user} />)}</div>;
}
