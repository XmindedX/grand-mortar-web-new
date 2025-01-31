import { title } from "process";
import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const productSchema = z.object({
    title: z.string().min(3).max(100),
    price: z.coerce.number().min(1).positive(),
    stock: z.coerce.number().int().positive(),
    image: z.string().nonempty(),
});
