import { z } from 'zod';

export const Course = {
    IT: "Information Technology",
    COMPSCI: "Computer Science"
} as const;

export type CourseType = typeof Course[keyof typeof Course];

const courses = Object.values(Course) as [string, ...string[]];

export const userSchema = z.object({
    id: z.number().optional(),
    lastName: z.string().min(1, "Last name is required!"),
    firstName: z.string().min(1, "First name is required!"),
    middleName: z.string().optional(),
    email: z.email("Invalid email format!"),
    birthdate: z.coerce.date(),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    course: z.enum(courses, "Please choose between [Computer Science] [Information Technology]"),

});

export type UserType = z.infer<typeof userSchema>;

export const userUpdateSchema = userSchema.partial();
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
