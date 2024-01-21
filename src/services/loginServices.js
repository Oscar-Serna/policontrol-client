import axios from "axios";
import { baseURL } from "./baseUrl";

const getUser = async ({ username, password }) => {
  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);

  const { data } = await axios.get(`${baseURL}/users?username=${encodedUsername}&password=${(encodedPassword)}`);

  console.log(data)

  return data;
};

const createUser = async (valuesJSON) => {
  const { data } = await axios.post(`${baseURL}/users`, valuesJSON);

  if(data === "El usuario ya existe"){
    return false;
  }

  

  return data;
};

export default { getUser, createUser };
