import React, { useContext } from "react";

import "../CSS/codigosQr.css";
import { GroupsDataContext } from "../context/groupsDataContext";
import { CardGroupQr } from "../components/cardGroupQr";

export const CodigosQR = () => {
  const { arrGroups } = useContext(GroupsDataContext);

  function renderGroupsQr() {
    if (arrGroups.length === 0)
      return (
        <div className="notGroups">
          <h3>NO EXISTEN GRUPOS DISPONIBLES PARA CÓDIGOS QR...</h3>
          <p>CREA UN GRUPO PARA VISUALIZAR LOS CÓDIGOS QR</p>
        </div>
      );

    return arrGroups.map((group, index) => (
      <CardGroupQr
        key={index}
        index={index}
        nameGroup={group.nameGroup}
        nameSection={group.nameSection}
        persons={group.persons}
        groupToken={group.groupToken}
      />
    ));
  }

  return (
    <section className="windowInformation windowCodigosQr">
      <h3>Grupos con Códigos QR</h3>
      <article>{renderGroupsQr()}</article>
    </section>
  );
};
