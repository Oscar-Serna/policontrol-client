import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, Navigate } from "react-router-dom";
import loginService from "../../services/loginServices";
import "../../CSS/loginForm.css";
import { useContext } from "react";
import { UserLoginContext } from "../../context/createUserContext";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const LoginForm = () => {
  const tokenUser = JSON.parse(localStorage.getItem("tku"));
  const docTitle = document.querySelector("title");

  const { animationFunction } = useContext(UserLoginContext);

  const [ navigateTo, setNavigateTo ] = useState(null);

  let [ stateImagePasswordVisible, setStateImagePasswordVisible ] = useState("inactive");
  let [ stateImagePasswordNotVisible, setStateImagePasswordNotVisible ] = useState("active");
  let [ statePasswordInput, setStateInputPassword ] = useState("password");

  docTitle.textContent = "Policontrol - Inicia sesión o regístrate";

  if (!(tokenUser === null)) {
    return (
      <>
        <h1>Redireccionado a tu cuenta...</h1>
        <Navigate to={"/u/"}/>
      </>
    );
  }

  const changeStatePassword =  () => {
    if(statePasswordInput === "password") {
      setStateInputPassword("text")
    }else{
      setStateInputPassword("password");
    }

    AnimationIconsPassword();
  }

  const AnimationIconsPassword = () => {
    if(stateImagePasswordNotVisible === "active"){
      setStateImagePasswordNotVisible("inactive");
      setStateImagePasswordVisible("active");
      return;
    }
    setStateImagePasswordVisible("inactive");
    setStateImagePasswordNotVisible("active");
  }

  return (
    <section className="mainLoginForm">
      <section className="loginForm">
        <article className="articleDescriptionForm">
          <h1>Policontrol</h1>
          <p>
            Te ayudamos a administrar tu trabajo como docente y administrativo
            con una interfaz rápida y simple.
          </p>
        </article>
        <article className="articleLoginForm">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values) => {
              try {
                const [{ tokenUser }] = await loginService.getUser(values);

                if (tokenUser) {
                  localStorage.setItem("tku", JSON.stringify(tokenUser));
                  setNavigateTo(<Navigate to={"/u/"}/>)
                }
              } catch (error) {
                alert("Usuario no encontrado, ingresa nuevamente los datos...");
              }
            }}
          >
            {({ handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <h1>- Iniciar sesión -</h1>
                  <input
                    type="text"
                    name="username"
                    className="inputLogin"
                    onChange={handleChange}
                    placeholder="Nombre de usuario o correo electrónico"
                    autoComplete="off"
                  />
                  <div>
                    <input
                      type={statePasswordInput}
                      name="password"
                      className="inputLogin"
                      onChange={handleChange}
                      placeholder="Contraseña"
                      autoComplete="off"
                    />
                    <AiOutlineEye className={`iconPassword ${stateImagePasswordVisible}`} onClick={() => {
                      changeStatePassword();
                    }}/>
                    <AiOutlineEyeInvisible className={`iconPassword ${stateImagePasswordNotVisible}`} onClick={() => {
                      changeStatePassword();
                    }}/>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="buttonForm buttonFormGuinda"
                    >
                      Iniciar sesión
                    </button>
                    <Link className="linkFormText">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <hr className="hrLoginForm" />
                  <div>
                    <Link className="linkForm">
                      <button
                        className="buttonForm buttonFormGreen"
                        onClick={() => {
                          animationFunction("open");
                        }}
                      >
                        Crear cuenta nueva
                      </button>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </article>
      </section>
      {navigateTo}
    </section>
  );
};
