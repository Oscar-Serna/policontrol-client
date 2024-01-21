import React, { useEffect } from "react";
import { useState } from "react";
import loginServices from "../../services/loginServices";
import "../../CSS/createUserForm.css";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { UserLoginContext } from "../../context/createUserContext";
import { useContext } from "react";

export const CreateUserForm = () => {
  const { animationFunction } = useContext(UserLoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [contact, setContact] = useState("");
  const [reminderKey, setReminderKey] = useState("");

  const [inputPasswordState, setInputPasswordState] = useState("password");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") animationFunction("close");
    });
  }, []);

  async function loginGetUser() {
    const buttonReset = document.querySelector(".buttonReset");

    if (typeUser === "")
      return alert("Debes de seleccionar que tipo de usuario eres");

    const tokenUser = createToken();

    console.log(tokenUser)

    const result = await loginServices.createUser({
      username,
      typeUser,
      password,
      contact,
      reminderKey,
      tokenUser
    });

    if (result != false) {
      buttonReset.click();
      animationFunction("close");
      AnimationButtonsTypeUser();
      localStorage.setItem("tku", JSON.stringify(tokenUser));
      window.location.href = `/u/`;
      return;
    }

    alert(
      "Este usuario ya existe...\nCambie su nombre de usuario o correo electrónico"
    );
  }

  function AnimationButtonsTypeUser(id) {
    const buttons = document.querySelectorAll(".buttonTypeUser");

    if (typeof id != "string") return;

    buttons.forEach((item) => {
      item.classList.remove("buttonSelected");
    });

    buttons[parseInt(id)].classList.add("buttonSelected");
  }

  function createToken() {
    const character =
      "abcedefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";

    let token = "";

    for (let i = 0; i < 30; i++) {
      token += `${character[Math.floor(Math.random() * 61)]}`;
    }

    return token;
  }

  function passwordVisibility() {
    const inputPassword = document.querySelector(".inputPassword");
    const iconPassword = document.querySelectorAll(".iconPassword");

    iconPassword.forEach(icon => {
      if(icon.classList.contains("visible")) icon.classList.replace("visible", "not-visible");
      else icon.classList.replace("not-visible", "visible");
    });

    if(inputPasswordState === "password") setInputPasswordState("text");
    else setInputPasswordState("password");
  }

  return (
    <section className="modalNewUser mNU-I">
      <article>
        <div>
          <h1>- Registro -</h1>
          {
            <AiOutlineClose
              className="icon"
              onClick={() => {
                animationFunction("close");
              }}
            />
          }
        </div>
        <form
          className="formNewUser"
          onSubmit={(e) => {
            loginGetUser();
            e.preventDefault();
          }}
        >
          <div className="contRegister">
            <input
              type="text"
              name="username"
              required
              maxLength={20}
              autoComplete="off"
              className="inputText inputPassword"
              placeholder="Nombre de usuario"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div className="">
              <input
                type={inputPasswordState}
                name="password"
                required
                maxLength={30}
                autoComplete="off"
                className="inputText"
                placeholder="Nueva contraseña"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {
                <AiOutlineEye
                  className="iconPassword not-visible"
                  onClick={() => {
                    passwordVisibility();
                  }}
                />
              }
              {
                <AiOutlineEyeInvisible
                  className="iconPassword visible"
                  onClick={() => {
                    passwordVisibility();
                  }}
                />
              }
            </div>
            <div className="contButtonsTypeUser">
              <p>Tipo de usuario:</p>
              <div>
                <input
                  type="button"
                  value="Docente"
                  className="buttonTypeUser"
                  id="0"
                  onClick={(e) => {
                    setTypeUser("docente");
                    AnimationButtonsTypeUser(e.target.id);
                  }}
                />
                <input
                  type="button"
                  value="Administrativo"
                  className="buttonTypeUser"
                  id="1"
                  onClick={(e) => {
                    setTypeUser("administrativo");
                    AnimationButtonsTypeUser(e.target.id);
                  }}
                />
              </div>
            </div>
            <input
              type="email"
              name="contact"
              required
              maxLength={40}
              autoComplete="off"
              className="inputText"
              placeholder="Correo electrónico"
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>
          <div className="contRecovery">
            <input
              type="text"
              name="reminderKey"
              maxLength={20}
              autoComplete="off"
              placeholder="Palabra secreta de recuperación de la cuenta"
              className="inputText"
              onChange={(e) => {
                setReminderKey(e.target.value);
              }}
            />
            <p>
              Opcional: Servirá si llega a olvidar la contraseña de su cuenta.
            </p>
          </div>
          <button type="submit" className="buttonSubmitNewUser">
            Registrarse
          </button>
          <button
            type="reset"
            style={{ display: "none" }}
            className="buttonReset"
          ></button>
        </form>
      </article>
    </section>
  );
};
