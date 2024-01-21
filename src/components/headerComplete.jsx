import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../context/userDataContext";
import { LiaUserCircleSolid } from "react-icons/lia";
import {
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineLogout,
} from "react-icons/ai";

import ImagenIPN from "../img/logoIPN.svg";

import { SlArrowRight } from "react-icons/sl";

import { GetImageUser } from "../services/userServices";
import "../CSS/headerComplete.css";
import { Link, useLocation } from "react-router-dom";
import { AnimationsContext } from "../context/animationsContext";

export const HeaderComplete = ({ nameSection }) => {
  const { username, tokenUser, typeUser } = useContext(UserDataContext);
  const { AnimationCreateNewSection } = useContext(AnimationsContext);
  const [userImage, setUserImage] = useState(null);
  const [stateWindowConfigUser, setStateWindowConfigUser] = useState("wCU-I");
  const hasImage = JSON.parse(localStorage.getItem("hasImage"));

  const location = useLocation();

  useEffect(() => {
    if (!(hasImage === null)) {
      const fetchImage = async () => {
        try {
          const result = await GetImageUser(tokenUser);
          setUserImage(result);
        } catch (error) {
          console.error("Error en la imagen solicitada", error);
        }
      };
      fetchImage();
    }
  }, []);

  const configuracionMiCuenta = () => {};

  const misCuentas = () => {};

  const cerrarSesión = () => {
    localStorage.removeItem("tku");
    window.location.href = "/";
  };

  function AnimationWindowUserConfig() {
    if (stateWindowConfigUser === "wCU-I") {
      return setStateWindowConfigUser("wCU-A");
    }
    setStateWindowConfigUser("wCU-I");
  }

  function comprobarRutaCrearSalon() {
    if (location.pathname != "/u/") return;
    return (
      <div
        className="containerAddGroup"
        onClick={() => {
          AnimationCreateNewSection();
        }}
      >
        <AiOutlinePlus className="image addNewSection" title="Crear salón" />
      </div>
    );
  }

  return (
    <>
      <section className="headerComplete">
        <article className="articleLogo">
          <Link to={`/u/`}>
            <div className="containerLogo">
              <img src={ImagenIPN} alt="" />
              <div>
                <h1>Policontrol</h1>
                <p>- {typeUser} -</p>
              </div>
            </div>
          </Link>
          <div className="containerInfoSection">
            <SlArrowRight />
            <h2>{nameSection}</h2>
          </div>
        </article>
        <article className="articleUserImage">
          {comprobarRutaCrearSalon()}
          <div
            className="containerUser"
            onClick={() => {
              AnimationWindowUserConfig();
            }}
          >
            {userImage && (
              <img
                src={URL.createObjectURL(userImage)}
                alt=""
                className="image mainUserImage wuc"
                title="Mi cuenta"
              />
            )}
            {hasImage === null && (
              <LiaUserCircleSolid
                className="image mainUserImage wuc"
                title="Mi cuenta"
              />
            )}
            <h4>Mi cuenta</h4>
          </div>
        </article>
        <div className={`containerInforUser ${stateWindowConfigUser}`}>
          <h5>
            ¡Hola, <span className="nameUser">{username}</span>!
          </h5>
          <nav className="configUser">
            <ul className="listConfigUser">
              <li onClick={() => {}}>
                <AiOutlineSetting className="image" />
                <p>Configuración</p>
              </li>
              <li onClick={() => {}}>
                <AiOutlineTeam className="image" />
                <p>Mis cuentas</p>
              </li>
              <li
                onClick={() => {
                  cerrarSesión();
                }}
              >
                <AiOutlineLogout className="image" />
                <p>Cerrar sesión</p>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div className="divisiorHeader"></div>
    </>
  );
};
