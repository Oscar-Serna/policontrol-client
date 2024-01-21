import React from "react";

export function IsLogged(){
  const token = JSON.parse(localStorage.getItem("tku"));
    if(token === null){
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
      return (
        <>
          <h1>No has iniciado sesión en este dispositivo.<br/>Redireccionandote...</h1>
        </>
      )
    }
}