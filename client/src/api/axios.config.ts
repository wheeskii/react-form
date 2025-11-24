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
  
  if (config.url === "/refresh") return config;

  let token = localStorage.getItem("accessToken");

  if (token && isTokenExpired(token)) {
    try {
      console.log("Access token expired, refreshing...");
      token = await refreshAccessToken();
      console.log("Refreshed access token:", token);
    } catch (error) {
      alert("Session expired. Redirecting to login page...")
      console.error("Refresh token expired:", error);
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


