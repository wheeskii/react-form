import type { UserType, UserUpdateType } from "../validator/user.validator";
import { axiosInstance } from "./axios.config";

export const getAllUsers = async (): Promise<UserType[]> => {
    const { data } = await axiosInstance.get("/users");
    return data.users;
};

export const getUserByID = async (id: any): Promise<UserType> =>  {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data.user;
};

export const updateUserByID = async (id: any, updatedData: UserUpdateType): Promise<UserType> =>  {
    const { data } = await axiosInstance.patch(`/users/${id}`)
    return data.user;
};