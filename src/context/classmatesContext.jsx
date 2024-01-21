import React, { createContext, useEffect, useState } from "react";

import { GetClassmateRegisted } from "../services/classmatesServices";

export const ClassmatesContext = createContext();

export const ClassmatesContextProvider = ({ children }) => {

  const [ classmateRequested, setClassmateRequested ] = useState([]);

  function GetClassmateRequested(dataQrCode) {

    const fetchData = async () => {
      try {
        const data = await GetClassmateRegisted(dataQrCode);

        if(data.length === 0){
          setClassmateRequested("null");
        }else{
          setClassmateRequested(data);
        }

      } catch (error) {
        console.log("ERROR EN classmatesContext.jsx", error);
      }
    }

    fetchData();

  }

  return (
    <ClassmatesContext.Provider value={{
      // ELEMENTS
      classmateRequested,
      //FUNCTIONS
      GetClassmateRequested,
      // STATES
      setClassmateRequested,
    }}>
      { children }
    </ClassmatesContext.Provider>
  )

}