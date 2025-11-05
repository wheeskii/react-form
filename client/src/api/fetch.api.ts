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
    const { data } = await axiosInstance.put(`/users/${id}`, updatedData);
    return data.user;
};

export const createUser = async (data: UserType): Promise<UserType> => {
    const { data: newUser } = await axiosInstance.post("/users", data);
    return newUser;
};
  
export const deleteUser = async (id: any): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
};

export const newAccessToken = async (): Promise<string | null> => {
    try {
        const res = await axiosInstance.post('/refresh', {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;
    
        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error("Failed to refresh access token: ", error);
        return null;
    }

}