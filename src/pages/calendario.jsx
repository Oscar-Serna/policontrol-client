import React, { useState } from "react";

import "../CSS/calendario.css";

export const Calendario = () => {
  const dias = new Array(31).fill(null);

  function renderCalendario() {
    return dias.map((dia, index) => (
        <div key={index}>
          <p>{index + 1}</p>
        </div>
    ));
  }

  return (
    <section className="windowInformation windowCalendario">
      <h3>Calendario</h3>
      <article className="articleCalendario">
        <h3>DICIEMBRE - 2023</h3>
        <div className="contentCalendario">
          {renderCalendario()}
        </div>
        </article>
    </section>
  );
};
