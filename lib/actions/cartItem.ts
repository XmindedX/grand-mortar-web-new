"use server"

import { db } from "@/database/drizzle";
import { cartItems } from "@/database/schema";

export const createCartItem = async (params: CartItems) => {
    try {

        const newProduct = await db
        .insert(cartItems)
        .values({
            ...params,
        })
        .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newProduct[0])),
        }

    } catch (error) {
        console.log(error);
    }
};