import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";
import { AiOutlineClose } from "react-icons/ai";
import "../CSS/createNewSection.css";
import { AnimationsContext } from "../context/animationsContext";
import { GroupsDataContext } from "../context/groupsDataContext";

import { CreateGroup } from "../services/groupServices.js";

export const CreateSection = () => {
  const buttonReset = document.querySelector(".buttonResetCreateSection");
  const { userId, typeUser } = useContext(UserDataContext);
  const { updateGroups } = useContext(GroupsDataContext);

  const {
    stateCreateNewSection,
    AnimationCreateNewSection,
    AnimationInputsCreateNewSection,
  } = useContext(AnimationsContext);
  const [typeSectionName, setTypeSectionName] = useState("");
  const [nameFirstInput, setNameFirstInput] = useState("");
  const [nameSecondInput, setNameSecondInput] = useState("");
  const [nameThirdInput, setNameThirdInput] = useState("");

  const [nameGroup, setNameGroup] = useState("");
  const [nameSection, setNameSection] = useState("");
  const [nameExtraSection, setNameExtraSection] = useState("");

  useEffect(() => {
    if (typeUser === "docente") {
      setTypeSectionName("Crear salón");
      setNameFirstInput("Nombre de la clase");
      setNameSecondInput("Nombre de la materia");
      setNameThirdInput("Aula o lugar");
    } else {
      setTypeSectionName("Crear grupo");
      setNameFirstInput("Nombre del grupo");
      setNameSecondInput("Nombre de la unidad administrativa");
      setNameThirdInput("Ubicación");
    }
  }, [typeUser]);

  async function createUserGroup() {
    const groupToken = createToken()
    const result = await CreateGroup({
      nameGroup,
      nameSection,
      nameExtraSection,
      userId,
      groupToken
    });

    AnimationCreateNewSection();
    AnimationInputsCreateNewSection(null, null, "all");
    buttonReset.click();
    updateGroups();
  }

  const createToken = () => {
    const character =
      "abcedefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";

    let token = "";

    for (let i = 0; i < 15; i++) {
      token += `${character[(Math.random() * 60).toFixed(0)]}`;
    }
    return token;
  };

  window.addEventListener('keydown', e => {
    if(e.key === "Escape") AnimationCreateNewSection();
  })

  return (
    <section
      className={`createNewSection ${stateCreateNewSection}`}
      onClick={(e) => {
        if (e.target.classList.contains("createNewSection")) {
          AnimationCreateNewSection();
        }
      }}
    >
      <article className="articleCreateNewSection">
        <h3>{typeSectionName}</h3>
        <AiOutlineClose
          className="image"
          onClick={() => {
            AnimationCreateNewSection();
            buttonReset.click();
          }}
        />
        <form
          className="formCreateSection"
          onSubmit={(e) => {
            createUserGroup();
            e.preventDefault();
          }}
        >
          <div className="containerInput">
            <input
              type="text"
              name=""
              className=""
              id="0"
              autoComplete="off"
              required
              onChange={(e) => {
                AnimationInputsCreateNewSection(e.target.id, e.target.value);
                setNameGroup(e.target.value);
              }}
            />
            <p>{nameFirstInput}</p>
          </div>
          <div className="containerInput">
            <input
              type="text"
              name=""
              className=""
              id="1"
              autoComplete="off"
              required
              onChange={(e) => {
                AnimationInputsCreateNewSection(e.target.id, e.target.value);
                setNameSection(e.target.value);
              }}
            />
            <p>{nameSecondInput}</p>
          </div>
          <div className="containerInput">
            <input
              type="text"
              name=""
              className=""
              id="2"
              autoComplete="off"
              onChange={(e) => {
                AnimationInputsCreateNewSection(e.target.id, e.target.value);
                setNameExtraSection(e.target.value);
              }}
            />
            <p>{nameThirdInput}</p>
          </div>
          <div className="containerButtons">
            <button
              type="reset"
              className="buttonResetCreateSection"
              onClick={() => {
                AnimationCreateNewSection();
                AnimationInputsCreateNewSection(null, null, "all");
              }}
            >
              Cancelar
            </button>
            <button type="submit">Crear</button>
          </div>
        </form>
      </article>
    </section>
  );
};
