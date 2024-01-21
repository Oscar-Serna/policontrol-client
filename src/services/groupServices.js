import { baseURL } from "./baseUrl";
import axios from "axios";

// GENERALES
export const GetGroups = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("tku"));
    const { data } = await axios.get(`${baseURL}/group?token=${token}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const CreateGroup = async (dataGroup) => {
  try {
    const result = await axios.post(`${baseURL}/group`, dataGroup);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export const DeleteGroup = async (groupToken) => {
  try {
    const {data} = await axios.delete(`${baseURL}/group?token=${groupToken}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}
