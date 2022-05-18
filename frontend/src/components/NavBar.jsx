import React, { useContext, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';
import '../App.css';

export default function NavBar() {
  const { setCurrentUser, currentUser } = useContext(AppContext);

  useEffect(() => {
    return () => setCurrentUser(currentUser);
  }, []);

  const logOut = () => {
    localStorage.clear()

  }
  
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Link to='/'>Home</Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {Object.keys(currentUser).length !== 0 && (
                <>
                  <Link to='/mypets'>My Pets</Link>
                  <Link to='/profile'>Profile</Link>
                </>
              )}

              <Link to='/admin'>Admin</Link>
              <Link onClick={logOut} to='/'>Log Out</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
