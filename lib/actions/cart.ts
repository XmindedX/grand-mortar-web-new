// "use server"

// import { cart } from "@/database/schema";
// import { db } from "@/database/drizzle";

// // export async function POST(req: any) {
// //     const { userId, productId, quantity } = await req.json();
// //     const result = await db.insert(cart).values({
// //         userId,
// //         productId,
// //         quantity
// //     }).returning();

// //     return NextResponse.json(result);
// // }

// export const addToCart = async (params: CartParams) => {
//     try {
//         const newCart = await db
//         .insert(cart)
//         .values({
//             ...params,
//         })
//         .returning();

//         return {
//             success: true,
//             data: JSON.parse(JSON.stringify(newCart[0])),
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }