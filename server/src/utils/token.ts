import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

// test
// const ACCESS_TOKEN_EXPIRY = '60s';
// const REFRESH_TOKEN_EXPIRY = '5m';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';


export const generateAccessToken = (user: any) => {
    const payload = { id: user.id, email: user.email }
    // console.log(ACCESS_TOKEN);
    return jwt.sign(payload, ACCESS_TOKEN!, { expiresIn: ACCESS_TOKEN_EXPIRY});
};

export const generateRefreshToken = (user: any) => {
    const payload = { id: user.id, email: user.email }
    // console.log(REFRESH_TOKEN);
    return jwt.sign(payload, REFRESH_TOKEN!, { expiresIn: REFRESH_TOKEN_EXPIRY});
};

