import React, { useState } from "react";
import { createContext } from "react";

export const UserLoginContext = createContext();

export const UserContextProvider = ({ children }) => {
  return (
    <UserLoginContext.Provider value={{
      animationFunction : AnimationWindowCreateUser
    }}>
      { children }
    </UserLoginContext.Provider>
  );
};

function AnimationWindowCreateUser(state) {
  const modalNewUser = document.querySelector('.modalNewUser');
  switch (state) {
    case "open":
      modalNewUser.classList.replace("mNU-I", "mNU-A");
      break;
    case "close":
      modalNewUser.classList.replace("mNU-A", "mNU-I");
      break;
  }
}
