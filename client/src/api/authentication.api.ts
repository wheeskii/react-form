import { axiosInstance } from "./axios.config";
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  exp: number;
  email: string;
};

// export const loginUser = async (email: string, navigate?:(path: string) => void) => {
export const loginUser = async (email: string) => {
    const { data } = await axiosInstance.post("/signin", { email });
    
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const decoded = jwtDecode<JWTPayload>(data.accessToken);
    const expiry = decoded.exp * 1000;
    const expiresAt = expiry - Date.now();

    console.log("Access token expires in:", Math.round(expiresAt / 1000), "seconds");
    localStorage.setItem("tokenExpiry", expiry.toString());

    // auto logout when access token expires
    // setTimeout(() => {
    //   alert("Session expired. Logging out...");
    //   localStorage.clear();
    //   if (navigate) navigate("/");
    // }, expiresAt);

    return data.user;
};