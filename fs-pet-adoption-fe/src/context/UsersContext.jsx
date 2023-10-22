import { createContext, useEffect, useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContextInstance } from './AuthContext';
import { PetsContextInstance } from './PetsContext';

const UsersContextInstance = createContext({});

const UsersContext = ({ children }) => {
  const [usersList, setUsersList] = useState([]);
  const [errorMsgClient, setErrorMsgClient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);

  const { loggedInUserID, setLoggedInUserID, setIsAdmin } = useContext(AuthContextInstance);
  const { setSavedPetsList, setFosteredPetsList, setAdoptedPetsList } = useContext(PetsContextInstance);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo(loggedInUserID);
  }, []);

  const fetchUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`, { withCredentials: true });
      console.log(loggedInUser)
      setLoggedInUser(res.data);
      setSavedPetsList(res.data.savedPets);
      if (res.data.role === 'Admin') {
        console.log('This user is an Admin');
        setIsAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:8080/users/${id}/savedpets`, { withCredentials: true });
        setSavedPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdoptedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:8080/users/${id}/adoptedpets`, { withCredentials: true });
        setAdoptedPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFosteredPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:8080/users/${id}/fosteredpets`, { withCredentials: true });
        setFosteredPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginReq = async (userDetails) => {
    try {
      const res = await axios.post('http://localhost:8080/users/login', userDetails, { withCredentials: true });
      console.log(res.data);
      if (res.data.ok) {
        localStorage.setItem('isLoggedin', res.data.id);
        setLoggedInUserID(res.data.id);
        fetchUserInfo(res.data.id);
        navigate('/search');
      }
    } catch (err) {
      setErrorMsgClient(err.message);
      console.log(err);
    }
  };

  return (
    <UsersContextInstance.Provider
      value={{
        errorMsgClient,
        setErrorMsgClient,
        fetchUserInfo,
        loggedInUser,
        setLoggedInUser,
        loginReq,
        fetchSavedPets,
        isLoading,
        setIsLoading,
        fetchAdoptedPets,
        fetchFosteredPets,
      }}
    >
      {children}
    </UsersContextInstance.Provider>
  );
};

export { UsersContextInstance };
export default UsersContext;
