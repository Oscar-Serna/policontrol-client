import React from "react";

import { IoNotifications } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export const CardNotification = ({ title, subtitle, message, hour }) => {
  return (
    <li className="cardNotification">
      <div className="imagenNotificacion">
        <IoNotifications />
      </div>
      <div className="informacion">
        <h3>
          {title} - {subtitle}
        </h3>
        <p>{message}</p>
      </div>
      <div className="interactivos">
        <FaStar />
        <FaTrashCan />
      </div>
      <p>{hour}</p>
    </li>
  );
};
