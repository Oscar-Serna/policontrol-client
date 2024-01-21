import { baseURL } from "./baseUrl";
import axios from "axios";

export const GetClassmateRegisted = async (dataQrCode) => {
  try {

    const { data } = await axios.get(`${baseURL}/classmates?dataQrCode=${dataQrCode}`);

    return data;

  } catch (error) {
    console.log("ERROR EN classmatesServices.js: ", error);
  }
}