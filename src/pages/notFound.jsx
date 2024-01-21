import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const TIEMPO_DEFINIDO = 500;
  let [tiempoRestante, setTiempoRestante] = useState(TIEMPO_DEFINIDO);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/u/";
    }, TIEMPO_DEFINIDO);

    setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((tiempoRestante -= 2));
    }, 1);
  }, []);

  return (
    <>
      <h1>No se encontró la ruta especificada: {location.pathname}</h1>
      <p>
        Redireccionandote al inicio en:{" "}
        <b>{Math.floor(tiempoRestante / 1000)}</b>...
      </p>
    </>
  );
};
