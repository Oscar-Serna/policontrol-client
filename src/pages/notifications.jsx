import React from "react";
import { CardNotification } from "../components/cardNotification";

import "../CSS/notifications.css";

export const Notifications = () => {
  function renderNotifications() {}

  return (
    <section className="windowInformation windowNotificaciones">
      <h3>Notificaciones</h3>
      <article className="articleNotificaciones">
        <ul>
          <CardNotification
            title={"¡Bienvenido a Policontrol!"}
            subtitle={"Te damos la bienvenida."}
            message={`En esta área podrás encontrar diversas formas de administrar tu area de trabajo o a tu alumnado, teniendo un mejor control y facilidad con tu trabajo.
            Disfruta de la herramienta que te brindamos para hacer un poco más facil tu trabajo!`}
            hour={"02:53:21, 14/12/23 "}
          />
        </ul>
      </article>
    </section>
  );
};
