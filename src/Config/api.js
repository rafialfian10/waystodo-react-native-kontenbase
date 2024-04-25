import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

export const API = axios.create({
  baseURL: "https://api.kontenbase.com/query/api/v1/6ab35651-5d87-4f05-9acd-1eee2a53a23a",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
