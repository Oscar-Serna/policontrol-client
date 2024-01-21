import React, { useContext, useEffect, useState } from "react";
import "../CSS/groupCard.css";
import { FiMoreVertical } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AnimationsContext } from "../context/animationsContext";
import { GroupsDataContext } from "../context/groupsDataContext";
import { DeleteGroup } from "../services/groupServices";
export const GroupCard = ({
  id,
  nameGroup,
  nameSection,
  nameExtraSection,
  groupToken,
  persons,
}) => {

  const { stateConfigGroup, AnimationConfigGroup } = useContext(AnimationsContext);

  const { updateGroups, setImagesIds } = useContext(GroupsDataContext);


  const deleteUserGroup = () => {
    try {
      const fetchDeleteGroup = async () => {
        try {
          await DeleteGroup(groupToken);
        } catch (error) {
          console.error("Error en GroupCard.jsx: " + error);
        }
        updateGroups();
      }

      fetchDeleteGroup();
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    setImagesIds();
  }, []);

  return (
    <article className={`groupCard`}>
      <div className="topCard">
        <Link to={`/g/${groupToken}`} title={`Entrar a: ${nameGroup.toUpperCase()}`}>
          <div>
            <h3>{nameGroup}</h3>
          </div>
          <h4>Grupo: {nameSection}</h4>
        </Link>
        <FiMoreVertical className="image gcc cDG" onClick={(e) => {
          AnimationConfigGroup(null, e.target, e.target.id);
        }}/>
      </div>
      <div className="bottomCard">
        <div className="numberPersonsGroup">
          <p>Integrantes</p>
          <p className="numberPersons">{persons}</p>
        </div>
        <div className="infoExtraCard">
          <p>{nameExtraSection}</p>
        </div>
      </div>
      <div className={`containerDeleteGroup cDG gC-I`}>
        <ul className="listFunctionsDeleteGroup cDG">
          <li onClick={() => {
            deleteUserGroup();
          }} title={`¿Eliminar grupo: ${nameGroup.toUpperCase()}?`}
          className="cDG">
            <RiDeleteBin2Line className="image cDG"/>
            <p className="cDG">Eliminar salón</p>
          </li>
        </ul>
      </div>
    </article>
  );
};
