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

export const orderSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().int().positive(),
});

export const orderParams = z.object({
    customer: z.string().min(3).max(100),
    number: z.string().min(3).max(100),
    email: z.string().email(),
    alamat: z.string().min(3).max(100),
    productList: z.array(
        z.object({
            id: z.string().min(3).max(100),
            title: z.string().min(3).max(100),
            quantity: z.coerce.number().int().positive(),
        })
    ),
});

export const cartsSchema = z.object({
    userId: z.string(),
});

export const cartItemsSchema = z.object({
    cartId: z.string(),
    productId: z.string(),
    quantity: z.coerce.number().int().positive(),
});
