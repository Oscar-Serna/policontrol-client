import React, { useContext, useEffect, useState } from "react";
import { MembersContext } from "../context/membersContext";
import QRCode from "react-qr-code";
import { LuUserCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import "../CSS/grupo/cardInfoMember.css";

export const CardInfoMember = ({
  index,
  nameMember,
  surnameMember,
  ageMember,
  assistants,
  totalActivities,
  dataQrCode,
}) => {
  const arrayActivities = eval(totalActivities);

  const [textActivities, setTextActivities] = useState("");

  const { AnimationInfoMember, DeleteMemberSelected } = useContext(MembersContext);

  useEffect(() => {
    arrayActivities.forEach((activity) => {
      setTextActivities(`${activity} </br>`);
    });

    if (arrayActivities.length === 0) {
      setTextActivities("- SIN ACTIVIDADES -");
    }
  });

  function descargarQR() {
    const svgElement = document.querySelector(".imageQrCode");

    if (!svgElement) {
      console.error('No se pudo encontrar el elemento SVG');
      return;
    }

    const svgXML = new XMLSerializer().serializeToString(svgElement);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgXML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = `${index + 1}.- ${nameMember} ${surnameMember} QR.png`;
      link.href = dataURL;
      link.click();

      URL.revokeObjectURL(dataURL);
    };

    img.src = url;
  }

  return (
    <section className="cardInfoMember">
      <article className="headerCardInfoMember">
        <h3>{index + 1}</h3>
        <LuUserCircle />
        <p>
          <span>
            <b>{ageMember}</b>
          </span>
          <br /> años
        </p>
      </article>
      <article className="infoCardInfoMember">
        <p className="nameMember">
          {nameMember} {surnameMember}
        </p>
        <p>
          <b>Asistencias:</b> {assistants}
        </p>
      </article>
      <article className="footerCardInfoMember">
        <div className="activitiesInfoMember">
          <h4>Actividades</h4>
          <p>{textActivities}</p>
        </div>
        <div
          className="qrCodeInfoMember"
          onClick={() => {
            descargarQR();
          }}
        >
          <QRCode value={dataQrCode} className="imageQrCode" id={index} />
          <p>Descargar</p>
        </div>
      </article>
      <article className="deleteMember">
        <input type="button" value="¿ Eliminar alumno ?" onClick={() => {
          DeleteMemberSelected(dataQrCode);
        }}/>
      </article>
      <figure
        className="imageClose"
        onClick={() => {
          AnimationInfoMember();
        }}
      >
        <MdClose />
      </figure>
    </section>
  );
};

export default CardInfoMember;
