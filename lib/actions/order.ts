// "use server"

// import { orders } from "@/database/schema";
// import { db } from "@/database/drizzle";
// import { eq } from "drizzle-orm";

// export const createOrder = async (params: OrderParams) => {
//     try {

//         const newProduct = await db
//         .insert(orders)
//         .values({
//             ...params,
            
//         })
//         .returning();

//         return {
//             success: true,
//             data: JSON.parse(JSON.stringify(newProduct[0])),
//         }

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const deleteOrder = async (data: Order) => {
//     try {
//         const deleteOrder = await db
//         .delete(orders)
//         .where(eq(orders.id, data.id));

//         if (!deleteOrder) {
//             return {
//                 success: false,
//                 error: "Failed to delete order",
//             }
//         }

//         return {
//             success: true,
//         }
//     } catch (error) {
//         console.log(error);
//         return {
//             success: false,
//             error: "Failed to delete order",
//         }
//     }
// }

