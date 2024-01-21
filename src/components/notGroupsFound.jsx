import React, { useEffect, useState } from "react";
import "../CSS/notGroupsFound.css";
import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";

import { PiArrowBendLeftUpBold } from "react-icons/pi";

export const NotGroupsFound = () => {
  const { typeUser } = useContext(UserDataContext);
  const [typeGroup, setTypeGroup] = useState("salón");

  useEffect(() => {
    if (typeUser === "administrativo") setTypeGroup("grupo");
  }, [typeUser]);

  return (
    <>
      <PiArrowBendLeftUpBold className="imageArrowNotGroupsFound" />
      <div className="containerNotGroupsFound">
        <h3 className="titleNotGroupsFound">
          Aun no has creado ningun {typeGroup}...
        </h3>
        <p>Empieza a crear uno haciendo click en "+"</p>
      </div>
    </>
  );
};
