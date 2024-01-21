import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";

export const PresentationNewUser = () => {
  const { username, typeUser } = useContext(UserDataContext);

  return (
    <>
      <h1>Bienvenido {username} eres el tipo de usuario: {typeUser}</h1>
    </>
  )
}