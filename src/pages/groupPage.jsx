import React, { useContext, useEffect, useState } from "react";

import { GroupsDataContext } from "../context/groupsDataContext";

import { FiSettings, FiUsers, FiCheckSquare, FiCalendar } from "react-icons/fi";

import { AdsPage } from "./subpages/group/adsPage";
import { ActivitiesPage } from "./subpages/group/activitiesPage";
import { ConfigPage } from "./subpages/group/configPage";
import { MembersPage } from "./subpages/group/membersPage";

import { useLocation } from "react-router-dom";

import "../CSS/groupPage.css";
import "../CSS/windowInformation.css";
import {
  MembersContext,
  MembersContextProvider,
} from "../context/membersContext";

export const GroupPage = () => {
  const pathname = useLocation().pathname;
  const opcionesNav = [
    { texto: "Anuncios", icono: <FiCalendar /> },
    { texto: "Actividades", icono: <FiCheckSquare /> },
    { texto: "Integrantes", icono: <FiUsers /> },
    { texto: "Configuración", icono: <FiSettings /> },
  ];

  const { getGroupToken } = useContext(GroupsDataContext);
  const [anuncios, setAnuncios] = useState(0);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchAnuncios = () => {
      try {
        return setAnuncios(null);
      } catch (error) {
        return console.log(error);
      }
    };

    fetchAnuncios();
  }, []);

  function renderAnuncios() {
    if (anuncios.length === 0) return;

    anuncios.map(() => {
      return;
    });
  }

  function cambiarSeccion(index) {
    const optionMenuGroup = document.querySelectorAll(".optionMenuGroup");

    optionMenuGroup.forEach((option) => {
      option.classList.remove("menuActive");
    });

    optionMenuGroup[index].classList.add("menuActive");

    switch (index) {
      case 0:
        // setContenidoSeleccionado(<AdsPage />);
        setContenidoSeleccionado(
          <MembersContextProvider>
            <MembersPage />
          </MembersContextProvider>
        );
        break;
      case 1:
        // setContenidoSeleccionado(<ActivitiesPage />);
        setContenidoSeleccionado(
          <MembersContextProvider>
            <MembersPage />
          </MembersContextProvider>
        );
        break;
      case 2:
        setContenidoSeleccionado(
          <MembersContextProvider>
            <MembersPage />
          </MembersContextProvider>
        );
        break;
      case 3:
        // setContenidoSeleccionado(<ConfigPage />);
        setContenidoSeleccionado(
          <MembersContextProvider>
            <MembersPage />
          </MembersContextProvider>
        );
        break;
    }
  }

  useEffect(() => {
    cambiarSeccion(2);
  }, []);

  return (
    <section className="windowInformation windowGroups">
      <section className="containerNavMenu">
        {opcionesNav.map((opcion, index) => (
          <nav
            className="optionMenuGroup"
            key={index}
            id={index}
            onClick={() => cambiarSeccion(index)}
          >
            {opcion.icono}
            <p>{opcion.texto}</p>
          </nav>
        ))}
      </section>
      <section className="containerGroupInfo">{contenidoSeleccionado}</section>
    </section>
  );
};
