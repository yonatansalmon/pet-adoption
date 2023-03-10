import React, { useContext, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';
import '../App.css';

export default function NavBar() {
  const { setCurrentUser, currentUser } = useContext(AppContext);

  const logOut = () => {
    localStorage.clear();
    setCurrentUser('');
  };

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Link to='/'>Home</Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {currentUser && (
                <>
                  <Link to='/mypets'>My Pets</Link>
                  <Link to='/admin'>Admin</Link>
                  <Link to='/profile'>Profile</Link>
                  <Link onClick={logOut} to='/'>
                    Log Out
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
