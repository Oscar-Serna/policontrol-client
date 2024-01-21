import React, { createContext, useContext, useEffect, useState } from "react";

import { CreateMember, GetMembers } from "../services/membersServices.js";

import { Html5Qrcode } from "html5-qrcode";

export const MembersContext = createContext();

import { CardInfoMember } from "../components/cardInfoMember";
import { DeleteMember } from "../services/membersServices";
import { GroupsDataContext } from "./groupsDataContext";

export const MembersContextProvider = ({ children }) => {
  const { getGroupToken } = useContext(GroupsDataContext);

  const [contentModalInfoMember, setContentModalInfoMember] = useState("");

  const [arrayMembers, setArrayMembers] = useState([]);

  const [qrCodeScanner, setQrCodeScanner] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scannerRunning, setScannerRunning] = useState(false);

  const [ reqDataQrCode, setReqDataQrCode ] = useState("");

  let [numMember, setNumMember] = useState(0);

  function ShowInfoMember(
    index,
    nameMember,
    surnameMember,
    ageMember,
    assistants,
    totalActivities,
    dataQrCode
  ) {
    setContentModalInfoMember(
      <CardInfoMember
        index={index}
        nameMember={nameMember}
        surnameMember={surnameMember}
        ageMember={ageMember}
        assistants={assistants}
        totalActivities={totalActivities}
        dataQrCode={dataQrCode}
      />
    );
  }

  function AnimationInfoMember() {
    const modalInfoMiembro = document.querySelector(".modalInfoMiembro");

    if (modalInfoMiembro.classList.contains("modalInactive")) {
      return modalInfoMiembro.classList.replace("modalInactive", "modalActive");
    }
    modalInfoMiembro.classList.replace("modalActive", "modalInactive");
  }

  function DeleteMemberSelected(dataQrCode) {
    const fetchDelete = async () => {
      try {
        const data = await DeleteMember(getGroupToken(), dataQrCode);
        console.log(data);
      } catch (error) {
        console.log("Error en membersContext.jsx", error);
      }
      UpdateMembers();
    };
    fetchDelete();
    AnimationInfoMember();
  }

  function UpdateMembers() {

    const fetchMembers = async () => {
      try {
        const members = await GetMembers(getGroupToken());
        setArrayMembers(members);
      } catch (error) {
        console.log("Error al obtener datos de miembros:", error);
      }
    };
    
    fetchMembers();
  }

  function activateQrCamera() {
    console.log("ENCONTRANDO CÁMARA, ESPERE...\nEN CASO DE NO ABRIRSE ES POSIBLE QUE OTRA APLICACIÓN ESTÉ USANDO LA CÁMARA, CIERRE POSIBLES APLICACIONES Y REINICIE EL NAVEGADOR Y ABRA DE NUEVO \"Policontrol\"")
    try {
      qrCodeScanner
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 200 },
          },
          (decodedText, _) => {
            setScanResult(decodedText);

            // PETICION PUT CON dataQrCode :PASO 2

            if(reqDataQrCode === decodedText) {
              successRegisterMember(reqDataQrCode, true);
              console.log("CORRECTO")
              stopQrCamera();
              setNumMember(numMember += 1);
            }else{
              alert("INCORRECTO")
            }

          },
          (errorMessage) => {
            // console.log(errorMessage)
          }
        )
        .then((_) => {
          setScannerRunning(true);
          console.log("CAMARA ABIERTA...")
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
          console.log("CAMARA CERRADA")
        })
        .catch((err) => {
          // console.log("Fallo al cerrar escaner");
        });
    } catch (error) {}
  }

  function successRegisterMember(dataQrCode, isAssisted) {
    if(isAssisted) {
      console.log("Asistio");
    }else{
      console.log("No asistio")
    }

    stopQrCamera();
    setNumMember(numMember += 1);
  }

  useEffect(() => {
    return () => {
      stopQrCamera();
    }
  }, [scannerRunning]);


  useEffect(() => {
    try {
      UpdateMembers();
    } catch (error) {
    }
  }, []);

  return (
    <MembersContext.Provider
      value={{
        //ELEMENTS
        contentModalInfoMember,
        arrayMembers,
        qrCodeScanner,
        numMember,
        reqDataQrCode,
        //FUNCTIONS
        AnimationInfoMember,
        ShowInfoMember,
        DeleteMemberSelected,
        UpdateMembers,
        activateQrCamera,
        stopQrCamera,
        successRegisterMember,
        //SETTERS
        setQrCodeScanner,
        setNumMember,
        setReqDataQrCode
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};
