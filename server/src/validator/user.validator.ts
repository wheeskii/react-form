import { z } from 'zod';
import { Course } from '../entities/user.entity';

const courses = Object.values(Course) as [string, ...string[]];

export const userSchema = z.object({
    id: z.number().optional(),
    lastName: z.string().min(1, "Required!"),
    firstName: z.string().min(1, "Required!"),
    middleName: z.string().optional(),
    email: z.email("Invalid email address!"),
    birthdate: z.string().min(1, "Birthdate is required!")
                .refine((val) => !isNaN(new Date(val).getTime()), "Invalid birthdate!"),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    course: z.enum(courses, "Please choose between [Computer Science] [Information Technology]"),

});

export type UserType = z.infer<typeof userSchema>;

export const userUpdateSchema = userSchema.partial();
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
