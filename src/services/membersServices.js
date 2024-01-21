import axios from "axios";
import { baseURL } from "./baseUrl";

export const GetMembers = async (groupToken) => {
  const { data } = await axios.get(`${baseURL}/members?token=${groupToken}`);

  return data;
};

export const CreateMember = async (dataJSON) => {
  const { data } = await axios.post(`${baseURL}/members`, dataJSON);

  return data;
};

export const DeleteMember = async (groupToken, dataQrCode) => {
  const { data } = await axios.delete(`${baseURL}/members?groupToken=${groupToken}&dataQrCode=${dataQrCode}`);

  return data;
}
