import axios from 'axios';


export const isTokenExpired = (): boolean => {
  const expiry = localStorage.getItem("tokenExpiry");
  // console.log(expiry);
  if (!expiry) return true; 
  return Date.now() > Number(expiry);
};

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token && !isTokenExpired()) {
      // if token exists and not expired
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // console.log("Access token expired!");
      localStorage.clear();

    }
    return config;
  },
  (error) => Promise.reject(error)
);
