import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { Request, Response } from 'express';
import { AppDataSource } from '../data/db.dataSource';

dotenv.config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "mySecret" as string;
const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET || "myRefresh" as string;

const userRepo = AppDataSource.getRepository(User);

export const loginUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        if(!email) {
            return res.status(404).json({
                success: false,
                message: "Email can't be read",
            });
        };

        const user = await userRepo.findOne({
            where: {
                email: email,
            }
        });
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        // short access
        const accessToken = jwt.sign(
            { email: user.email },
            SECRET_KEY,
            { expiresIn: "5m" } 
          );
        
        // longer access
        const refreshToken = jwt.sign(
            { email: user.email },
            REFRESH_KEY,
            { expiresIn: "1h" } 
        );

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
        })
        
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Service Error"
        });
    }

    
}