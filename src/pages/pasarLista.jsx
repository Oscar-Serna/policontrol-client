import React, { useContext, useEffect, useState } from "react";

import { GroupsDataContext } from "../context/groupsDataContext";

import { GroupCardPasarLista } from "../components/groupCardPasarLista";

import "../CSS/pasarLista.css";

export const PasarLista = () => {
  const { arrGroups, updateGroups } = useContext(GroupsDataContext);

  function renderGroups() {
    if (arrGroups.length === 0) return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h3>NO EXISTEN GRUPOS DISPONIBLES...</h3>
        <p>CREA UN GRUPO PARA EMPEZAR CON EL PASE DE LISTA</p>
      </div>
    );
    return arrGroups.map((group, index) => (
      <GroupCardPasarLista
        key={index}
        index={index}
        nameGroup={group.nameGroup}
        nameSection={group.nameSection}
        groupToken={group.groupToken}
        persons={group.persons}
      />
    ));
  }

  useEffect(() => {
    updateGroups()
  }, []);

  return (
    <section className="windowInformation windowPasarLista">
      <h3>Grupos disponibles</h3>
      <article className="articleCardsPasarLista">{renderGroups()}</article>

    </section>
  );
};
