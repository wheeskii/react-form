import { User } from '../entities/user.entity';
import { Request, Response } from 'express';
import { AppDataSource } from '../data/db.dataSource';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const userRepo = AppDataSource.getRepository(User);

export const signinUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        if(!email) {
            return res.status(404).json({
                success: false,
                message: "Email can't be read",
            });
        };
        
        const user = await userRepo.findOne({ where: { email: email, } });
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        };
        
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        


        return res.status(200).json({
            success: true,
            message: "Login Successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
            }
        });
        
    } catch(error) {
        console.error(error);
        return res.status(406).json({
            success: false,
            message: "Invalid credentials"
        });
    };
};


