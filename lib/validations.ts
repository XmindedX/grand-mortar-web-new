import { number, z } from "zod";

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

export const cartsSchema = z.object({
    userId: z.string(),
});

export const cartItemsSchema = z.object({
    cartId: z.string(),
    productId: z.string(),
    quantity: z.coerce.number().int().positive(),
});

export const orderSchema = z.object({
    userId: z.string(),
    customer: z.string().min(3),
    number: z.coerce.number().int().min(3),
    email: z.string().email(),
    address: z.string().min(10),
    city: z.string().min(3),
    province: z.string().min(3),
    postalCode: z.coerce.number().int().positive(),
  });

export const orderItemsSchema = z.object({
    orderId: z.string(),
    productId: z.string(),
    quantity: z.coerce.number().int().positive(),
});
