import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data/db.dataSource";

const userRepo = AppDataSource.getRepository(User);

export const addNewUser = async(req: Request, res: Response) => {
    try {
        const newUser = userRepo.create(req.body)

        await userRepo.save(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating new user: ", error
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await userRepo.find({
            order: { lastName: "ASC"}
        });
        
        res.status(200).json({ users });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error getting all users: ", error,
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const user = await userRepo.findOneBy({ id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        userRepo.merge(user, req.body);
        const result = await userRepo.save(user);

        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    } catch (error) {
        console.error("Update error: ");
        return res.status(500).json({
            success: false,
            message: "Error updating user: ", error
        });
    }
};

export const getUserByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await userRepo.findOneBy({ id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({ user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error getting user by ID: ", error
        })
    }
}

export const deleteUserByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await userRepo.delete({ id });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({ 
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error delete user: ", error
        });
    }
}
