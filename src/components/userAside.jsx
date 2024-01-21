import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineQrcode,
  AiOutlineHistory,
  AiOutlineFileExcel,
  AiOutlineEdit,
  AiOutlineBell,
  AiOutlineApartment,
} from "react-icons/ai";
import { PiIdentificationBadge } from "react-icons/pi"
import { UserDataContext } from "../context/userDataContext";
import { GroupsDataContext } from "../context/groupsDataContext";

import { GroupCardAside } from "./groupCardAside";

import "../CSS/userAside.css";

export const UserAside = () => {
  const { typeUser } = useContext(UserDataContext);
  const { arrGroups } = useContext(GroupsDataContext);

  const [stateArrowGroups1, setStateArrowGroups1] = useState("");
  const [stateArrowGroups2, setStateArrowGroups2] = useState("iAInone");
  const [stateListGroups, setStateListGroups] = useState("lGA-I");
  const [typeGroup, setTypeGroup] = useState("salones");
  const [ numeroGrupos, setNumeroGrupos ] = useState(0);

  useEffect(() => {
    setNumeroGrupos(arrGroups.length);

  }, [arrGroups]);

  useEffect(() => {
    if (typeUser === "administrativo") setTypeGroup("grupos");
  }, [typeUser]);

  const renderGroupsAside = () => {
    if (arrGroups.length === 0) return <p style={{paddingTop : ".5rem"}}>Sin {typeGroup} existentes...</p>;
    return arrGroups.map((group, index) => {
      return (
        <GroupCardAside
          key={group.groupId}
          index={index}
          id={group.groupId}
          nameGroup={group.nameGroup}
          persons={group.persons}
          groupToken={group.groupToken}
        />
      );
    });
  };

  const AnimationGroupsAside = () => {
    const listGroupsCardAside = document.querySelector(".listGroupsCardAside");
    const imgArrowItem = document.querySelectorAll(".imgArrowItem");
    if (listGroupsCardAside.classList.contains("lGA-I")) {
      imgArrowItem[0].classList.remove("iAInone");
      imgArrowItem[1].classList.add("iAInone");
      return listGroupsCardAside.classList.replace("lGA-I", "lGA-A");
    }
    imgArrowItem[0].classList.add("iAInone");
    imgArrowItem[1].classList.remove("iAInone");
    listGroupsCardAside.classList.replace("lGA-A", "lGA-I");
  };

  const interfazControlEntradas = () => {
    if(typeUser === "administrativo"){
      return(
        <Link to={"/u/control"}>
          <li className="itemMainFunction">
            <PiIdentificationBadge className="image"/>
            <p>Identificación Alumnos QR</p>
          </li>
        </Link>
      )
    }
  }

  return (
    <aside className="userAside">
      <ul className="listUserAside">
        <Link to={`/u/`}>
          <li className="itemMainFunction">
            <AiOutlineHome className="image" />
            <p>Inicio</p>
          </li>
        </Link>
        <Link to={'/u/calendario'}>
          <li className="itemMainFunction">
            <AiOutlineCalendar className="image"/>
            <p>Calendario</p>
          </li>
        </Link>
        <li
          className="itemMainFunction itemGroupsAside"
          onClick={() => {
            AnimationGroupsAside();
          }}
        >
          <div>
            <BiSolidDownArrow
              className={`imgArrowItem ${stateArrowGroups2}`}
              id={0}
            />
            <BiSolidRightArrow
              className={`imgArrowItem ${stateArrowGroups1}`}
              id={1}
            />
            <AiOutlineApartment className="image" />
            <p style={{ textTransform: "capitalize" }}>{typeGroup}</p>
            <p className="textoNumeroGrupos">{numeroGrupos}</p>
          </div>
          <ul
            className={`listGroupsCardAside ${stateListGroups}`}
          >
            {renderGroupsAside()}
          </ul>
        </li>
        {
          interfazControlEntradas()
        }
        <Link to={"/u/notificaciones"}>
          <li className="itemMainFunction">
            <AiOutlineBell className="image" />
            <p>Notificaciones</p>
          </li>
        </Link>
      </ul>
      <ul className="listUserAside">
        <h3>Accesos directos</h3>
        <Link to={"/u/pasarLista"}>
          <li className="itemMainFunction">
            <AiOutlineEdit className="image" />
            <p>Pasar lista</p>
          </li>
        </Link>

        <Link to={"/u/codigosQR"}>
          <li className="itemMainFunction">
            <AiOutlineQrcode className="image" />
            <p>Códigos QR</p>
          </li>
        </Link>
{/* 
        <Link to={"/u/listasExcel"}>
          <li className="itemMainFunction">
            <AiOutlineFileExcel className="image" />
            <p>Listas en Excel</p>
          </li>
        </Link> */}
      </ul>
    </aside>
  );
};
