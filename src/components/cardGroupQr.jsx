import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const CardGroupQr = ({ index, nameGroup, nameSection, persons, groupToken }) => {

  return (
    <div className="cardGroupQr">
      <div className="info">
        <h3>{index + 1}.- </h3>
        <h4>{nameGroup} &nbsp;-&nbsp; {nameSection}</h4>
        <p>-&nbsp;&nbsp; Integrantes: <b>{persons}</b></p>
      </div>
      <div className="button">
        <Link to={`/q/${groupToken}`}>
          <input type="button" value="Ver códigos QR" />
        </Link>
      </div>
    </div>
  )
}