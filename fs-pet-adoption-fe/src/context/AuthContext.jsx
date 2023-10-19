import React, { createContext, useEffect, useState } from 'react';

const AuthContextInstance = createContext();

const AuthContext = ({ children }) => {
  const [loggedInUserID, setLoggedInUserID] = useState(localStorage.getItem('isLoggedin') || false);
  const [isAdmin, setIsAdmin] =useState(false);

  useEffect(()=>{
    console.log(localStorage.getItem('isLoggedin'))
    setLoggedInUserID(localStorage.getItem('isLoggedin'))
},[])

  return <AuthContextInstance.Provider value={{loggedInUserID, setLoggedInUserID, isAdmin, setIsAdmin }}>
    {children}
    </AuthContextInstance.Provider>;
};

export { AuthContextInstance };
export default AuthContext;
