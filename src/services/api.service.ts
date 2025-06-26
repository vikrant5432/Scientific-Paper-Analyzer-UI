import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8000",
});

backendApi.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken") as string;
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default backendApi;
