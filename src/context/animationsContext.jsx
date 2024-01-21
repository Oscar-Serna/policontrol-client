import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { MembersContext } from "./membersContext";

export const AnimationsContext = createContext();

export const AnimationsContextProvider = ({ children }) => {
  const [stateCreateNewSection, setStateCreateNewSection] = useState("cNS-I");

  function AnimationCreateNewSection () {
    if (stateCreateNewSection === "cNS-I") {
      return setStateCreateNewSection("cNS-A");
    }
    setStateCreateNewSection("cNS-I");
  };

  function AnimationInputsCreateNewSection (id, value, state) {
    const textsInputs = document.querySelectorAll(".containerInput p");

    if (state === "all") {
      return textsInputs.forEach((item, index) => {
        item.classList.remove("textSelected");
      });
    }

    if (!(value === "")) {
      return textsInputs[id].classList.add("textSelected");
    }
    return textsInputs[id].classList.remove("textSelected");
  };

  function AnimationConfigGroup (state, target, id) {
    const containersDelete = document.querySelectorAll(".containerDeleteGroup");

    if (target.parentNode.classList.contains("gcc")) id = target.parentNode.id;

    containersDelete.forEach((container, index) => {
      if (index != id) container.classList.replace("gC-A", "gC-I");

      if (!(id === container.id)) return;
      if (container.classList.contains("gC-I")) {
        return container.classList.replace("gC-I", "gC-A");
      }
      return container.classList.replace("gC-A", "gC-I");
    });
  };

  return (
    <AnimationsContext.Provider
      value={{
        // VARIABLES
        stateCreateNewSection,
        // FUNCTIONS
        AnimationCreateNewSection,
        AnimationInputsCreateNewSection,
        AnimationConfigGroup,
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};
