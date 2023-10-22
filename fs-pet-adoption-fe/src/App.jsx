import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Guest/Login';
import Search from './components/SearchPet/Search';
import PetPage from './components/SearchPet/PetPage';

import UserProfile from './components/User/UserProfile';
import UpdatePassword from './components/User/UpdatePassword';
import MyPets from './components/User/MyPets';
import PrivateRouteUser from './components/User/PrivateRouteUser';

import HomeAdmin from './components/Admin/HomeAdmin';
import PrivateRouteAdmin from './components/Admin/PrivateRouteAdmin';
import AddPet from './components/Admin/AddPet';
import EditPet from './components/Admin/EditPet';
import ViewUser from './components/Admin/ViewUser';

import UsersContext from './context/UsersContext';
import PetsContext from './context/PetsContext';
import AuthContext from './context/AuthContext';
import AdminContext from './context/AdminContext';

import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ChakraProvider>
        <AuthContext>
          <PetsContext>
            <UsersContext>
              <AdminContext>
                <Navbar onOpen={onOpen} />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route
                    path='/admin'
                    element={
                      <PrivateRouteAdmin>
                        <HomeAdmin />
                      </PrivateRouteAdmin>
                    }
                  />
                  <Route
                    path='/admin/addpet'
                    element={
                      <PrivateRouteAdmin>
                        <AddPet />
                      </PrivateRouteAdmin>
                    }
                  />

                  <Route path='/admin/editpet/'>
                    <Route
                      path=':petId'
                      element={
                        <PrivateRouteAdmin>
                          <EditPet />
                        </PrivateRouteAdmin>
                      }
                    />
                  </Route>

                  <Route path='/admin/viewuser/'>
                    <Route
                      path=':userId'
                      element={
                        <PrivateRouteAdmin>
                          <ViewUser />
                        </PrivateRouteAdmin>
                      }
                    />
                  </Route>

                  <Route path='/login' element={<Login onOpen={onOpen} isOpen={isOpen} onClose={onClose} />} />
                  <Route path='/search' element={<Search />} />

                  <Route path='/pets'>
                    <Route path=':petId' element={<PetPage />} />
                  </Route>

                  <Route
                    path='/mypets'
                    element={
                      <PrivateRouteUser>
                        <MyPets />
                      </PrivateRouteUser>
                    }
                  />
                  <Route
                    path='userprofile/edit'
                    element={
                      <PrivateRouteUser>
                        <UserProfile />
                      </PrivateRouteUser>
                    }
                  />
                  <Route
                    path='userprofile/updatepassword'
                    element={
                      <PrivateRouteUser>
                        <UpdatePassword />
                      </PrivateRouteUser>
                    }
                  />
                </Routes>
              </AdminContext>
            </UsersContext>
          </PetsContext>
        </AuthContext>
      </ChakraProvider>
    </>
  );
}

export default App;
