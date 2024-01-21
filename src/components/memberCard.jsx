import React, {useContext} from "react";
import { MembersContext } from "../context/membersContext";

import { LuUserCircle } from "react-icons/lu";

import QRCode from "react-qr-code";

import "../CSS/grupo/memberCard.css";

export const MemberCard = ({
  index,
  nameMember,
  surnameMember,
  ageMember,
  assistants,
  totalActivities,
  dataQrCode
}) => {
  const numberActivities = eval(totalActivities).length;

  const { AnimationInfoMember, ShowInfoMember } = useContext(MembersContext)

  return (
    <li className="itemMemberCard" onClick={() => {
      ShowInfoMember(
        index,
        nameMember,
        surnameMember,
        ageMember,
        assistants,
        totalActivities,
        dataQrCode
      );
      AnimationInfoMember();
    }}>
      <div className="imageMember">
        <h3>{index + 1}</h3>
        <LuUserCircle className="userImage" />
      </div>
      <div className="infoMember">
        <p className="info">
          {nameMember} {surnameMember} - Actividades: {numberActivities}
        </p>
        <p className="assistants">
          <b>Asistencias:</b> {assistants}
        </p>
      </div>
      <div className="qrMember">
        <QRCode value={dataQrCode} className="imgQrMember" />
      </div>
    </li>
  );
};
