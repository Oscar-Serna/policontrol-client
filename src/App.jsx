import React from "react";
import { Route, Routes } from "react-router-dom";
/* PAGES */
// -- LOGIN
import { NotFound } from "./pages/notFound";
import { LoginForm } from "./pages/login/formLogin";
import { CreateUserForm } from "./pages/login/formCreateUser";
// -- INDEX PAGE
import { IndexPage } from "./pages/indexPage";
// -- PASAR LISTA
import { PasarLista } from "./pages/pasarLista";

/*COMPONENTS*/
// --LOGIN
import { IsLogged } from "./components/isLogged";
// -- USERS PAGE
import { HeaderComplete } from "./components/headerComplete";
import { UserAside } from "./components/userAside";
import { CreateSection } from "./components/createGroup";
// -- GROUPS
import { GroupPage } from "./pages/groupPage";

/* CONTEXTS */
import { UserContextProvider } from "./context/createUserContext";
import { UserDataContextProvider } from "./context/userDataContext";
import { AnimationsContextProvider } from "./context/animationsContext";
/* CSS */
import "./CSS/generalStyles.css";
import { GroupsDataContextProvider } from "./context/groupsDataContext";
import { MembersContextProvider } from "./context/membersContext";
import { Notifications } from "./pages/notifications";
import { CodigosQR } from "./pages/codigosQR";
import { Calendario } from "./pages/calendario";
import { PasarListaGrupo } from "./pages/pasarListaGrupo";
import { CodigosQrGrupo } from "./pages/codigosQRGrupo";
import { ClassmatesContextProvider } from "./context/classmatesContext";
import { ClassmatesQr } from "./pages/classmatesQr";
import { SearchQr } from "./pages/searchQr";

function App() {
  return (
    <AnimationsContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <UserContextProvider>
              <LoginForm
                typeForm="Iniciar sesión"
                isNotLogin=""
                textButtonSecondAction="Crear cuenta nueva"
                routeButton="/createUser"
              />
              <CreateUserForm />
            </UserContextProvider>
          }
        />

        <Route
          path="/u/"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Inicio"} />
              <GroupsDataContextProvider>
                <section className="sectionMainInfoUser">
                  <UserAside />
                  <IndexPage />
                </section>
                <CreateSection />
              </GroupsDataContextProvider>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/calendario"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Calendario"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <Calendario />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/g/:groupToken"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Grupos"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <GroupPage />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/control"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Identificación Alumnos Qr"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <ClassmatesContextProvider>
                    <ClassmatesQr />
                  </ClassmatesContextProvider>
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/searchQr"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Identificación Alumnos Qr"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <ClassmatesContextProvider>
                    <SearchQr />
                  </ClassmatesContextProvider>
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/notificaciones"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Notificaciones"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <Notifications />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/pasarLista"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Pasar lista"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <PasarLista />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/l/:groupToken"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Pasar lista por grupo"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <MembersContextProvider>
                    <PasarListaGrupo />
                  </MembersContextProvider>
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/codigosQR"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Codigos Qr"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <CodigosQR />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/q/:groupToken"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Codigos Qr por Grupo"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                  <MembersContextProvider>
                    <CodigosQrGrupo />
                  </MembersContextProvider>
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="/u/listasExcel"
          element={
            <UserDataContextProvider>
              <IsLogged />
              <HeaderComplete nameSection={"Lista en Excel"} />
              <section className="sectionMainInfoUser">
                <GroupsDataContextProvider>
                  <UserAside />
                </GroupsDataContextProvider>
              </section>
            </UserDataContextProvider>
          }
        />

        <Route
          path="*"
          element={
            <>
              <NotFound />
            </>
          }
        />
      </Routes>
    </AnimationsContextProvider>
  );
}

export default App;
