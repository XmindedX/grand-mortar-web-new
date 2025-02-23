"use server"

import { products } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createProduct = async (params: ProductParams) => {
    try {

        const newProduct = await db
        .insert(products)
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
        return {
            success: false,
            error: "Failed to create product",
        }
    }
};

export const deleteProduct = async (data: Product) => {
    try {
        const deleteProduct = await db
        .delete(products)
        .where(eq(products.id, data.id));

        if (!deleteProduct) {
            return {
                success: false,
                error: "Failed to delete product",
            }
        }

        
        
        return {
            success: true,
            
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to delete product",
        }
    }
}

export const updateProduct = async (id: string, params: ProductParams) => {
    try {
        console.log(id, params);
        const updateProduct = await db
        .update(products)
        .set({
            ...params,
        })
        .where(eq(products.id, id))
        .returning();

        if (!updateProduct) {
            return {
                success: false,
                error: "Failed to update product",
            }    
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updateProduct[0])),
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to update product",
        }
    }
}