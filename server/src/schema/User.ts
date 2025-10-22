import { z } from "zod";

export const userDataSchema = z.object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email("Invalid email address"),
    birthdate: z.string().pipe(z.coerce.date()),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    course: z.enum(["Information Technology", "Computer Science"]) ,
});

export type userData = z.infer<typeof userDataSchema>