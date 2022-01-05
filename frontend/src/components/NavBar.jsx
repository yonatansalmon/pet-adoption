import React, { useContext, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../context/appContext';
import '../App.css'

export default function NavBar() {
  const { setCurrentUser, currentUser } = useContext(AppContext);

  useEffect(() => {
    return () => setCurrentUser(currentUser);
  }, []);
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
              {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
