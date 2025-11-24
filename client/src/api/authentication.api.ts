import { axiosInstance } from "./axios.config";

export const loginUser = async (email: string) => {
  const { data } = await axiosInstance.post("/signin", { email });
  localStorage.setItem("accessToken", data.accessToken);
  // localStorage.setItem("refreshToken", data.refreshToken);
  return data.user;
};
