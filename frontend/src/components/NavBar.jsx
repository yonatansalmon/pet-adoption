import React, { useContext } from 'react';
import { Link} from 'react-router-dom';

import AppContext from '../context/appContext'

export default function NavBar() {
  const appContext = useContext(AppContext);

  return (
    <div>
      <ul>
        <li><Link to='/'>Log In</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/home'>Home</Link></li>

      </ul>
    </div>
  );
}
