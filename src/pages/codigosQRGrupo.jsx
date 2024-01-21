import React, { useContext, useEffect } from "react";
import { MembersContext } from "../context/membersContext";

import { CardMemberQr } from "../components/cardMemberQr";

import "../CSS/codigosQrGrupo.css"

export const CodigosQrGrupo = () => {
  const { arrayMembers } = useContext(MembersContext);

  function renderQrCodeMembers() {
    if (arrayMembers.length === 0) return <p>No hay miembros</p>;
    return arrayMembers.map((member, index) => (
      <CardMemberQr
        key={index}
        index={index}
        nameMember={member.nameMember}
        surnameMember={member.surnameMember}
        dataQrCode={member.dataQrCode}
      />
    ));
  }

  return (
    <section className="windowInformation windowCodigosQrGrupo">
      <h3>CODIGOS QR</h3>
      <article>{renderQrCodeMembers()}</article>
    </section>
  );
};
