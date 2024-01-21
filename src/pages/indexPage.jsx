import React, { createElement, useEffect } from "react";
import { useContext } from "react";
import "../CSS/windowInformation.css";
import { GroupsDataContext } from "../context/groupsDataContext";
import { GroupCard } from "../components/groupCard";
import { NotGroupsFound } from "../components/notGroupsFound";

import { Link } from "react-router-dom";

import "../CSS/generalStyles.css";

export const IndexPage = () => {
  const { arrGroups } = useContext(GroupsDataContext);

  useEffect(() => {
    
  }, [])

  function renderGroups() {
    if (arrGroups.length === 0) return <NotGroupsFound />;
    return arrGroups.map((group) => (
      <GroupCard
        key={group.groupId}
        id={group.groupId}
        nameGroup={group.nameGroup}
        nameSection={group.nameSection}
        nameExtraSection={group.nameExtraSection}
        groupToken={group.groupToken}
        persons={group.persons}
      />
    ));
  }

  return (
    <section className="windowInformation windowIndexPage">
      
      {renderGroups()}

    </section>
  );
};
