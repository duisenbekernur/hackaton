import axios from "axios";

// Базовый роут чтобы в далнейшем не писать локалхост каждый раз
const instanse = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// вшил токен к headers.Authorization чтобы в каждом запросе проверилось авторизован ли я
instanse.interceptors.request.use((config) => {
  config.headers.Authorization = `${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instanse;
