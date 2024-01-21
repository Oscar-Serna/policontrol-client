import React, { useContext, useEffect, useState } from "react";

import "../CSS/pasarListaGrupo.css";
import { MembersContext } from "../context/membersContext";
import { GroupsDataContext } from "../context/groupsDataContext";

import { CardPasarListaCamera } from "../components/cardPasarListaCamera";

export const PasarListaGrupo = () => {
  const { getGroupToken, arrGroups } = useContext(GroupsDataContext);
  const { arrayMembers, numMember, setNumMember } = useContext(MembersContext);

  const [nameGroup, setNameGroup] = useState("");
  const [nameSection, setNameSection] = useState("");

  const [groupToken, setGroupToken] = useState(getGroupToken());

  useEffect(() => {
    arrGroups.forEach((group) => {
      if (groupToken === group.groupToken) {
        setNameGroup(group.nameGroup);
        setNameSection(group.nameSection);
      }
    });
  }, [arrGroups]);

  function renderOneMember(numberMember) {
    if (arrayMembers.length === 0) return(
      <div>
        <h3>No existen miembros en este grupo...</h3>
        <p><u>Crea miembros</u> o <u>cambia de grupo</u> para pasar lista.</p>
      </div>
    );

    if (numberMember === arrayMembers.length)
      return console.log("Pasado de lista máximo");

    let nameMember = arrayMembers[numberMember].nameMember;
    let ageMember = arrayMembers[numberMember].ageMember;
    let dataQrCode = arrayMembers[numMember].dataQrCode;

    return (
      <CardPasarListaCamera
        key={numberMember}
        index={numberMember}
        nameMember={nameMember}
        ageMember={ageMember}
        nameGroup={nameGroup}
        nameSection={nameSection}
        dataQrCode={dataQrCode}
      />
    );
  }


  return (
    <section className="windowInformation windowPasarListaGrupo">
      <h3>Pase de lista - {nameGroup}</h3>

      <article>{renderOneMember(numMember)}</article>
    </section>
  );
};
