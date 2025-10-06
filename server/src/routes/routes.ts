import express, { request } from "express";
import { User } from "../models/User";
import { where } from "sequelize";

const router = express.Router();

router.post("/users", async (req, res) => {
 
    const { name, email, birthdate, phoneNumber } = req.body;
    const user = await User.create({ name, email, birthdate, phoneNumber });
    res.status(201).json(user);
  
});


export default router