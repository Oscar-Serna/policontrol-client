import React, { useContext, useState } from "react";

import "../CSS/searchQr.css";

import { IoSearch } from "react-icons/io5";
import { ClassmatesContext } from "../context/classmatesContext";

import QRCode from "react-qr-code";

export const SearchQr = () => {
  const [textSearched, setTextSearched] = useState(null);

  const { GetClassmateRequested, classmateRequested, setClassmateRequested } =
    useContext(ClassmatesContext);

  function renderSearchedQr() {
    if (classmateRequested.length === 0)
      return (
        <div className="membersNotFound">
          <h3>Oops, aún no hay nada por aquí...</h3>
          <p>Busca alumnos para obtener su código QR.</p>
        </div>
      );

    if (
      (textSearched === null || textSearched.trim() === "") &&
      classmateRequested.length != 0
    ) {
      setClassmateRequested([]);
      return (
        <div className="membersNotFound">
          <h3>debes ingresar algún valor...</h3>
          <p>
            Ingresa el número de boleta del alumno que deseas buscar para
            continuar.
          </p>
        </div>
      );
    }

    if (classmateRequested === "null")
      return (
        <div className="membersNotFound">
          <h3>Mmmm, parece que este alumno no existe...</h3>
          <p>
            Verifica el número de boleta que ingresaste o prueba con otro
            distinto.
          </p>
        </div>
      );

    return classmateRequested.map((classmate, index) => (
      <div
        key={index}
        className="cardMemberSearched"
        onClick={() => {
          descargarQR(classmate.boleta);
        }}
        title="Descargar QR"
      >
        <QRCode value={classmate.boleta} className="imageQrCode" />
        <p>{classmate.nombre}</p>
        <input type="button" value="Descargar" />
      </div>
    ));
  }

  function descargarQR(boleta) {
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
      link.download = `${boleta}-QR.png`;
      link.href = dataURL;
      link.click();

      URL.revokeObjectURL(dataURL);
    };

    img.src = url;
  }

  return (
    <section className="windowInformation windowSearchQr">
      <h3>Buscar Código Qr De Alumno</h3>

      <article>
        <div className="containerSearch">
          <IoSearch />
          <input
            type="text"
            className="inputBuscador"
            placeholder="BUSCAR QR ALUMNO : ( INGRESAR BOLETA DEL ALUMNO )"
            onChange={(e) => {
              setTextSearched(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                GetClassmateRequested(textSearched);
              }
            }}
          />
          <input
            type="button"
            value={"BUSCAR"}
            className="buttonBuscar"
            onClick={() => {
              GetClassmateRequested(textSearched);
            }}
          />
        </div>

        <div className="containerClassmateSearched">{renderSearchedQr()}</div>
      </article>
    </section>
  );
};
