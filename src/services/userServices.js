import axios from "axios";
import { baseURL} from "./baseUrl";

export const GetUserInformation = async (tokenUser) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/users/getAll?token=${tokenUser}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetImageUser = async (tokenUser) => {
  try {
    if (tokenUser === null) return;
    const { data } = await axios.get(`${baseURL}/images?token=${tokenUser}`, {
      responseType: "blob",
    });

    return data;
  } catch (error) {
    console.log("Error en userServices.js: " + error);
  }
};
