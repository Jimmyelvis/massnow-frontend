import React, { useContext, useState, useEffect, useReducer } from "react";


const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  /**
   * Check to see if there is a comment in local
   * storage. The results will set the comment body state
   */
  const authFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("auth")) {
      return JSON.parse(localStorage.getItem("auth"));
    } else {
      return false;
    }
  };

  const [isSignedIn, setIsSignedIn] = useState(authFromLS());

  // const [isSignedIn, setIsSignedIn] = useState(false);


  const updateAuthStatus = () => {

    setIsSignedIn(!isSignedIn);

     
  };

  useEffect(() => {

    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(isSignedIn));
    }
  
  }, [isSignedIn]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        updateAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider };