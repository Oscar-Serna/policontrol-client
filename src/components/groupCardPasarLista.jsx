import React from "react";

import { Link } from "react-router-dom";

export const GroupCardPasarLista = ({
  index,
  nameGroup,
  groupToken,
  nameSection,
  persons,
}) => {
  return (
    <li className="cardPasarLista">
      <div className="title">
        <h3>{index + 1}.-</h3>
      </div>
      <div className="info">
        <p className="nameGroup">
          <b>{nameGroup}</b>
        </p>
        -
        <p className="nameGroup">
          <b>{nameSection}</b>
        </p>
        -
        <p>
          Integrantes: <b>{persons}</b>
        </p>
      </div>
      <div className="button">
        <Link to={`/l/${groupToken}`}>
          <input type="button" value="Comenzar" />
        </Link>
      </div>
    </li>
  );
};
