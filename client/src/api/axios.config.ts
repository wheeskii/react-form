import axios from 'axios';
import { jwtDecode } from "jwt-decode";


export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAxios = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

const refreshAccessToken = async () => {
  const { data } = await refreshAxios.post("/refresh");
  const newToken = data.accessToken;
  localStorage.setItem("accessToken", newToken);
  return newToken;
};

axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");

  if (token) {
    if (isTokenExpired(token)) {
      console.log("⚠️ Access token is expired: ", token)
      try {
        token = await refreshAccessToken();
        console.log(`✅ New Access Token: ${token}`)
      } catch (error) {
        console.error("🛑 Refresh token failed:", error);
        localStorage.clear();
        window.location.href = "/";
        // throw error;
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
  };

  return config;
});

