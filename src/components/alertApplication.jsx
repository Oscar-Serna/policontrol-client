import React, { useEffect, useState } from "react";

export const AlertApplication = ({ typeAlert, messageAlert }) => {
  const [imageAlert, setImageAlert] = useState("");
  const [ message, setMessage ] = useState(messageAlert);

  useEffect(() => {
    switch (typeAlert) {
      case "success":
        // IMAGEN DE CORRECTO PALOMA
        setImageAlert();
        break;
      case "info":
        // IMAGEN DE INFORMACIÓN
        setImageAlert();
        break;
      case "advert":
        // IMAGEN DE ADVERTENCIA
        setImageAlert();
        break;
      case "error":
        // IMAGEN DE ERROR
        setImageAlert();
        break;

      default:
        setImageAlert();
        setMessage("NO SE INDICO UN MENSAJE, IGNORA ESTO");
        break;
    }
  }, []);

  return (
    <section className="alertApplication">
      <div>{/* IMAGEN DE ALERTA SELECCIONADA */}</div>
      <div>
        <h4>{message.toUpperCase()}</h4>
      </div>
      {/* IMAGEN DE CIERRE */}
    </section>
  );
};
