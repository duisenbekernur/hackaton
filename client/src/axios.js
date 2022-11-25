import axios from "axios";

const instanse = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = `${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instanse;
