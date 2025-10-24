
import type { UserType } from "../validator/user.validator";
import axiosInstance from "./axios.config";

export const getAllUsers = async ():Promise<UserType[]> => {
    const {data} = await axiosInstance.get("/users");
    return data.users;
};

