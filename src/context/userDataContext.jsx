import React, { createContext, useEffect, useState } from "react";
import { GetUserInformation } from "../services/userServices.js";

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const tokenUser = JSON.parse(localStorage.getItem("tku"));

  const [ username, setUsername ] = useState(null);
  const [ typeUser, setTypeUser ] = useState(null);
  const [ userId, setUserId ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ { userId, username, typeUser } ] = await GetUserInformation(tokenUser);

        if (username && typeUser) {
          setUsername(username);
          setTypeUser(typeUser);
          setUserId(userId);
        }
      } catch (error) {
        console.log("Un error en: " + error);
      }
    }
    if (tokenUser) {
      fetchData();
    }
  }, []);



  return (
    <UserDataContext.Provider value={
      {
        // VALORES
        userId,
        username,
        typeUser,
        tokenUser
        // FUNCIONES
      }
      }
    >

      { children }

    </UserDataContext.Provider>
  );
};
