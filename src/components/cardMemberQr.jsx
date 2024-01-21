import React from "react";

import QRCode from "react-qr-code";

export const CardMemberQr = ({
  index,
  nameMember,
  surnameMember,
  dataQrCode,
}) => {
  function descargarQR() {
    const svgElement = document.querySelector(".imageQrCode");

    if (!svgElement) {
      console.error("No se pudo encontrar el elemento SVG");
      return;
    }

    const svgXML = new XMLSerializer().serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgXML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `${index + 1}.- ${nameMember} ${surnameMember} QR.png`;
      link.href = dataURL;
      link.click();

      URL.revokeObjectURL(dataURL);
    };

    img.src = url;
  }

  return (
    <div
      className="cardCodigoQrMember"
      onClick={() => {
        descargarQR();
      }}
    >
      <QRCode value={dataQrCode} className="imageQrCode" />
      <p>
        {index + 1}. {nameMember} {surnameMember}
      </p>
      <input type="button" value="Descargar" />
    </div>
  );
};
