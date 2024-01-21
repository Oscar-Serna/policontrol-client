import React from "react";

import { PiStudentFill } from "react-icons/pi";

export const ClassmateQr = ({ nombre, grupo, turno, carrera, situacion_academica }) => {


  return (
    <div className="cardQrClassmateInfo">
      <PiStudentFill />
      <p className="turno">{turno}</p>
      <p className="nombre">{nombre}</p>
      <p className="grupo">{grupo}</p>
      <p className="carrera">{carrera}</p>
      <p className="situacion"><b>Situación académica:</b><br /> {situacion_academica}</p>


    </div>
  )
}