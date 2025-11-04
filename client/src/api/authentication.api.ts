import { axiosInstance } from "./axios.config";
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  exp: number;
  email: string;
};

export const loginUser = async (email: string) => {
    const { data } = await axiosInstance.post("/signin", { email });
    
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const decoded = jwtDecode<JWTPayload>(data.accessToken);
    const expiresAt = decoded.exp * 1000;

    localStorage.setItem("tokenExpiry", expiresAt.toString());

    return data.user;
};