import React from "react";
import { Link } from "react-router-dom";

export const GroupCardAside = ({ index, id, nameGroup, persons, groupToken }) => {
  return (
    <Link to={`/g/${groupToken}`} target="_parent">
      <li id={id} className="itemGroupAside">
        <h4>{nameGroup}</h4>
        <p>{persons}  </p>
      </li>
    </Link>
  );
};
