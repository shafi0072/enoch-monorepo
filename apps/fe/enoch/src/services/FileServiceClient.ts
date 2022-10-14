import axios from "axios";
import config from "../config";
import { localStorageVariables } from "../constants/localStorageVariables";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(localStorageVariables.ACCESS_TOKEN);
  }
};
const client = axios.create({
  baseURL: `${config.env.FILE_SERVICE_END_POINT}/upload`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "multipart/form-data",
  },
});

class FileServiceClient {
  async post(url: string, payload: any) {
    return await client.post(url, payload);
  }
}

export default new FileServiceClient();
