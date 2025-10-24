
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { access } from 'fs';

dotenv.config();
export const loginUser = async (req: Request, res: Response) => {
    const user = req.body.user;
    const username = {name: user}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
}