import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cart } from "@/database/schema";
import { products } from "@/database/schema";

export async function POST(req: any) {
    const  {userId, productId, quantity} = await req.json();

    const result = await db.insert(cart).values({
        userId: userId,
        productId: productId,
        quantity: quantity
    }).onConflictDoUpdate({
        target: cart.productId, set: {
            quantity: cart.quantity + quantity
        }
    }).returning();
    return NextResponse.json(result)
}

// export async function POST(req: any) {
//     const { productId, quantity } = await req.json();
//     const result = await db.insert(cart).values({
//         userId,
//         productId,
//         quantity
//     }).returning();

//     return NextResponse.json(result);
    
    // const result = await db.insert(cart).values({
    //     productId,
    //     quantity
    // }).onConflictDoUpdate({
    //     target: cart.productId, set: {
    //         quantity: cart.quantity + quantity
    //     }
    // })
// }