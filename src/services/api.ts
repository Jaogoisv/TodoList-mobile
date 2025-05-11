import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://386e-177-107-31-154.ngrok-free.app", 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
