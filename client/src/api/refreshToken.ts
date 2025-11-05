// src/utils/refreshAccessToken.ts
import { axiosInstance } from "../api/axios.config";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { data } = await axiosInstance.post("/refresh", {}, { withCredentials: true });
    const newAccessToken = data.accessToken;

    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      console.log("🔄 Access token refreshed!");
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};
