import React, { createContext, useEffect, useState } from "react";
import { GetGroups } from "../services/groupServices";

import { useLocation } from "react-router-dom";

export const GroupsDataContext = createContext();

export const GroupsDataContextProvider = ({ children }) => {
  const [arrGroups, setArrGroups] = useState([]);
  const location = useLocation();

  // Fetch GetGroups
  useEffect(() => {
    updateGroups();
  }, []);

  function setImagesIds () {
    const images = document.querySelectorAll(".topCard .image");
    const containersDelete = document.querySelectorAll(".containerDeleteGroup");
    images.forEach((image, index) => {
      image.id = index;
      containersDelete[index].id = index;
    })
  }

  function updateGroups () {
    const fetchGroupsData = async () => {
      try {
        const groups = await GetGroups();
        setArrGroups(groups);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroupsData();
    setImagesIds();
  };

  const getGroupToken = () => {
    const pathname = location.pathname;
    let token = "";

    for (let i = 0; i < pathname.length; i++) {
      i > 2 ? (token += pathname[i]) : false;

      if (i === pathname.length - 1) return token;
    }
  };

  

  return (
    <GroupsDataContext.Provider
      value={{
        // CONTENT
        arrGroups,
        // FUNCTIONS
        // fetchGetMembers,
        updateGroups,
        getGroupToken,
        setImagesIds
      }}
    >
      {children}
    </GroupsDataContext.Provider>
  );
};
