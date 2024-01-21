import React, { useContext, useEffect, useState } from "react";

import { GroupsDataContext } from "../../../context/groupsDataContext";
import { MembersContext } from "../../../context/membersContext.jsx";

import { CreateMember, GetMembers } from "../../../services/membersServices.js";

import { MemberCard } from "../../../components/memberCard";

import "../../../CSS/grupo/membersPage.css";

import { FiPlus, FiEdit, FiClock, FiX } from "react-icons/fi";
import { NotMembersFound } from "../../../components/notMembersFound.jsx";
import { Navigate } from "react-router-dom";

export const MembersPage = () => {
  const { getGroupToken } = useContext(GroupsDataContext);
  const { contentModalInfoMember, AnimationInfoMember, UpdateMembers, arrayMembers } =
    useContext(MembersContext);

  const [ navigateTo, setNavigateTo ] = useState(null);

  const [numeroIntegrantes, setNumeroIntegrantes] = useState(1);

  const [infoIntegrantesRender, setInfoIntegrantesRender] = useState(null);

  const opcionesGrupo = [
    { texto: "Agregar integrantes", icono: <FiPlus /> },
    { texto: "Asignar actividad general", icono: <FiEdit /> },
    { texto: "Comenzar pase de lista", icono: <FiClock /> },
  ];

  function renderOpcionesGrupo() {
    return opcionesGrupo.map((opcion, index) => (
      <div
        key={index}
        onClick={() => {
          modalOpcion(index);
        }}
      >
        {opcion.icono}
        <p>{opcion.texto}</p>
      </div>
    ));
  }

  function modalOpcion(index) {
    switch (index) {
      case 0:
        const modal = document.querySelector(".modalAgregarIntegrantes");
        if (modal.classList.contains("modalInactive"))
          return modal.classList.replace("modalInactive", "modalActive");
        modal.classList.replace("modalActive", "modalInactive");
        break;
      case 1:
        break;
      case 2:
        setNavigateTo(<Navigate to={`/l/${getGroupToken()}`}/>);
        break;
    }
  }

  function subModalOpcion(type) {
    const articleNumberMembers = document.querySelector(
      ".articleNumberMembers"
    );
    const articleInfoMembers = document.querySelector(".articleInfoMembers");
    switch (type) {
      case "incial":
        articleNumberMembers.classList.replace(
          "subModalActive",
          "subModalInactive"
        );
        articleInfoMembers.classList.replace(
          "subModalInactive",
          "subModalActive"
        );
        break;
      case "terminal":
        articleInfoMembers.classList.replace(
          "subModalActive",
          "subModalInactive"
        );
        setTimeout(() => {
          articleNumberMembers.classList.replace(
            "subModalInactive",
            "subModalActive"
          );
        }, 150);
        break;
    }
  }

  function renderNewInfoMembers() {
    const inputInfoMember = document.querySelectorAll(".inputInfoMember");
    inputInfoMember.forEach((input) => (input.value = ""));

    const miembrosNulos = Array(parseInt(numeroIntegrantes)).fill(null);
    return miembrosNulos.map((not, index) => (
      <li key={index} className="itemListInfoNewMember">
        <div>
          <h4>{index + 1}</h4>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nombre (s)"
            id={index}
            name="names"
            className="inputInfoMember"
          />
          <input
            type="text"
            placeholder="Apellidos"
            id={index}
            name="surnames"
            className="inputInfoMember"
          />
          <input
            type="number"
            placeholder="Edad"
            id={index}
            name="age"
            className="inputInfoMember"
          />
        </div>
      </li>
    ));
  }

  function createNewMember() {
    const inputsName = document.getElementsByName("names");
    const inputsSurname = document.getElementsByName("surnames");
    const inputsAge = document.getElementsByName("age");

    inputsName.forEach((input, index) => {
      const nameMember = input.value;
      const surnameMember = inputsSurname[index].value;
      const ageMember = inputsAge[index].value;
      const groupToken = getGroupToken();
      const dataQrCode = `${nameMember},${ageMember},${groupToken},${surnameMember}`;

      const fetchCreate = async () => {
        try {
          await CreateMember({
            nameMember,
            surnameMember,
            ageMember,
            groupToken,
            dataQrCode,
          });
        } catch (error) {
          console.log(error);
        }
        UpdateMembers();
      };

      fetchCreate();
    });
  }

  function renderMembers() {
    if (eval(arrayMembers).length === 0) return <NotMembersFound />;
    return arrayMembers.map((member, index) => (
      <MemberCard
        key={index}
        index={index}
        nameMember={member.nameMember}
        surnameMember={member.surnameMember}
        ageMember={member.ageMember}
        assistants={member.assistants}
        totalActivities={member.totalActivities}
        dataQrCode={member.dataQrCode}
      />
    ));
  }


  return (
    <article className="articleMembersPage">
      <section className="seccionOpcionesGrupo">
        {renderOpcionesGrupo()}
      </section>

      <section
        className="modalAgregarIntegrantes modalInactive"
        onClick={(e) => {
          if (e.target.classList.contains("modalAgregarIntegrantes")) {
            modalOpcion(0);
            subModalOpcion("terminal");
          }
        }}
      >
        <article className="articleNumberMembers subModalActive">
          <div className="header">
            <h3>Agregar integrantes</h3>
            <FiX
              onClick={() => {
                modalOpcion(0);
              }}
            />
          </div>
          <div className="content">
            <p>Cantidad de integrantes a agregar:</p>
            <input
              type="number"
              value={numeroIntegrantes}
              id="inputNumberMembers"
              onChange={(e) => {
                setNumeroIntegrantes(e.target.value);
              }}
            />
          </div>
          <div className="buttons">
            <input
              type="button"
              value="Cancelar"
              onClick={() => {
                modalOpcion(0);
              }}
            />
            <input
              type="button"
              value="Siguiente"
              onClick={() => {
                subModalOpcion("incial");
                setInfoIntegrantesRender(renderNewInfoMembers());
              }}
            />
          </div>
        </article>
        <article className="articleInfoMembers subModalInactive">
          <div className="header">
            <h3>Información de los integrantes</h3>
            <FiX
              onClick={() => {
                modalOpcion(0);
                subModalOpcion("terminal");
              }}
            />
          </div>
          <div className="content">
            <ul>{infoIntegrantesRender}</ul>
          </div>
          <div className="buttons">
            <input
              type="button"
              value="Cancelar"
              onClick={() => {
                modalOpcion(0);
                subModalOpcion("terminal");
              }}
            />
            <input
              type="button"
              value="Finalizar"
              onClick={() => {
                subModalOpcion("terminal");
                modalOpcion(0);
                createNewMember();
              }}
            />
          </div>
        </article>
      </section>

      <section
        className="modalInfoMiembro modalInactive"
        onClick={(e) => {
          if (e.target.classList.contains("modalInfoMiembro")) {
            AnimationInfoMember();
          }
        }}
      >
        {contentModalInfoMember}
      </section>

      <section className="seccionMiembros">
        <ul className="listMembersCard">{renderMembers()}</ul>
      </section>
      {navigateTo}
    </article>
  );
};
