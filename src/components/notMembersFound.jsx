import React from "react";

export const NotMembersFound = () => {
  return (
    <section
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: ".5rem",
        color : "rgb(97, 31, 63)"
      }}
    >
      <h3
        style={{
          fontSize : "26px",
        }}
      >NO SE ENCONTRARON MIEMBROS...</h3>
      <p
        style={{
          fontSize : "18px",
        }}
      >AGREGA INTEGRANTES PARA COMENZAR</p>
    </section>
  );
};
