import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// axios configuration
const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// handle request token in header
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle error in response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: "Network Error" });
    }
    return Promise.reject(error);
  }
);

export default api;
