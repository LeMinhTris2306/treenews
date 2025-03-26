import React, { createContext, useEffect, useState } from "react";
import { useUser } from "./utils/hooks/useUser";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/reducers/userSlice";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { loadUser } = useUser();
  useEffect(() => {
    loadUser();
    console.log("loading user~");
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUser]);
  //   console.log(`auth status: ${isAuthenticated}`);
  return (
    <UserContext.Provider value={{ isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
