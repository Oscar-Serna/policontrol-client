import React, { useContext, useEffect, useState } from "react";
import { ClassmatesContext } from "../context/classmatesContext";

import { Html5Qrcode } from "html5-qrcode";
import { GetClassmateRegisted } from "../services/classmatesServices";

import "../CSS/classmatesQr.css";
import { ClassmateQr } from "../components/classmateQr";
import { Link } from "react-router-dom";

import { IoQrCodeSharp } from "react-icons/io5";


export const ClassmatesQr = () => {
  const [qrCodeScanner, setQrCodeScanner] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [scannerRunning, setScannerRunning] = useState(false);

  const [dataClassmate, setDataClassmate] = useState([]);

  function activateQrCamera() {
    console.log(
      'ENCONTRANDO CÁMARA, ESPERE...\nEN CASO DE NO ABRIRSE ES POSIBLE QUE OTRA APLICACIÓN ESTÉ USANDO LA CÁMARA, CIERRE POSIBLES APLICACIONES Y REINICIE EL NAVEGADOR Y ABRA DE NUEVO "Policontrol"'
    );
    try {
      qrCodeScanner
        .start(
          { facingMode: "environment" },
          {
            fps: 20,
            qrbox: { width: 400, height: 300 },
          },
          (decodedText, _) => {
            setScanResult(decodedText);

            const fetchData = async () => {
              const data = await GetClassmateRegisted(decodedText);
              setDataClassmate(data);
            };

            fetchData();
          },
          (errorMessage) => {
            // console.log(errorMessage)
          }
        )
        .then((_) => {
          setScannerRunning(true);
          console.log("CAMARA ABIERTA...");
        });

      return () => {
        if (qrCodeScanner && scannerRunning) {
          qrCodeScanner.stop();
          setScannerRunning(false);
        }
      };
    } catch (error) {
      // console.log(error)
    }
  }

  function stopQrCamera() {
    try {
      qrCodeScanner
        .stop()
        .then((ignore) => {
          setScannerRunning(false);
          // console.log("Escaner detenido...");
          console.log("CAMARA CERRADA");
        })
        .catch((err) => {
          // console.log("Fallo al cerrar escaner");
        });
    } catch (error) {}
  }

  function renderClassmate() {
    if (dataClassmate.length === 0)
      return (
        <div className="notFoundClassmateQr">
          <IoQrCodeSharp />
          <h3>Escanea un alumno para obtener su información.</h3>
        </div>
      );

    return dataClassmate.map((classmate, index) => (
      <ClassmateQr
        key={index}
        nombre={classmate.nombre}
        grupo={classmate.grupo}
        turno={classmate.turno}
        carrera={classmate.carrera}
        situacion_academica={classmate.situacion_academica}
      />
    ));
  }

  useEffect(() => {
    return () => {
      stopQrCamera();
    };
  }, [scannerRunning]);

  useEffect(() => {
    setQrCodeScanner(new Html5Qrcode("reader"));
  }, []);

  useEffect(() => {
    if (scannerRunning === false) {
      activateQrCamera();
    }
  }, [qrCodeScanner]);

  return (
    <section className="windowInformation windowClassmates">
      <h3>Identificación alumnos QR</h3>
      <article>
        <div className="containerReader">
          <div id="reader"></div>
          <Link to={"/u/searchQr"}>
            <input type="button" value={"Buscar Código QR de Alumno"} />
          </Link>
        </div>
        <div className="containerInfoMember">{renderClassmate()}</div>
      </article>
    </section>
  );
};
