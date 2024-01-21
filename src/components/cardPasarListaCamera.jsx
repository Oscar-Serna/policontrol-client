import React, { useContext, useEffect, useState } from "react";
import { LuUserCircle } from "react-icons/lu";

import { MdClose } from "react-icons/md";
import { MembersContext } from "../context/membersContext";
import { Html5Qrcode } from "html5-qrcode";

export const CardPasarListaCamera = ({
  index,
  nameMember,
  nameGroup,
  nameSection,
  ageMember,
  dataQrCode,
}) => {
  // PENDIENTE: NUM MEMBER SUMARLO, CONDICIONAL NUM MEMBER CON ARR-LENGHT, MANDAR PUT A SERVER, PASAR AL SIG MEMBER

  const {
    activateQrCamera,
    qrCodeScanner,
    setQrCodeScanner,
    setReqDataQrCode,
    successRegisterMember,
  } = useContext(MembersContext);

  useEffect(() => {
    setQrCodeScanner(new Html5Qrcode("reader"));

    // HACEMOS UN SET DATA QR CODE EN EL CONTEXT MEMBERS PARA IDENTIFICARLO Y CONDICIONARLO EN EL CONTEXT :PASO 1

    // setDataQrCode(dataQrCode);
  }, []);

  useEffect(() => {
    setReqDataQrCode(dataQrCode);
  }, []);

  useEffect(() => {
    activateQrCamera();
  }, [qrCodeScanner]);

  return (
    <article className="cardPasarListaCamera">
      <div className="header">
        <h3>{index + 1}</h3>
        <LuUserCircle />
      </div>
      <div className="infoMember">
        <p className="name">
          <b>{nameMember}</b>
        </p>
        <p className="group">
          <b></b>{" "}
          <span>
            {nameGroup} - {nameSection}
          </span>
        </p>
        <p className="age">
          <b>Edad:</b> {ageMember}
        </p>
      </div>
      <div id="reader"></div>
      <div className="controlesManuales">
        <h4>- CONTROLES MANUALES -</h4>
        <div className="botones">
          <input
            type="button"
            value="No asistió"
            className="noasistio"
            onClick={() => {
              successRegisterMember(dataQrCode, false);
            }}
          />
          <input
            type="button"
            value="Asistió"
            className="asistio"
            onClick={() => {
              successRegisterMember(dataQrCode, true);
            }}
          />
        </div>
      </div>
    </article>
  );
};
