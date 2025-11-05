import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data/db.dataSource";

const userRepo = AppDataSource.getRepository(User);

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      const user = await userRepo.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      const newRefreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
      });

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while refreshing token",
    });
  }
};
