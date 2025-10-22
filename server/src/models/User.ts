import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

// models/User.ts
export const User = sequelize.define("User", {
    name: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: {
            isEmail: true 
        }},
    birthdate: { 
        type: DataTypes.DATEONLY,
        allowNull: false 
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{11}$/
        }},
    course: {
        type: DataTypes.ENUM("Information Technology", "Computer Science"),
        allowNull: false 
    },
    
  });
  