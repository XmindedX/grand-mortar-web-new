import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database/drizzle";
import { carts, cartItems } from "@/database/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;

    try {
      // Cari atau buat cart baru untuk user
      let cart = await db.select().from(carts).where(eq(carts.userId, userId)).limit(1);

      if (!cart.length) {
        const newCart = await db.insert(carts).values({ userId: userId }).returning();
        cart = newCart;
      }

      const cartId = cart[0].id;

      // Cek apakah produk sudah ada di cart
      const existingItem = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.productId, productId) && eq(cartItems.cartId, cartId))
        .limit(1);

      if (existingItem.length) {
        // Update quantity jika produk sudah ada
        await db
          .update(cartItems)
          .set({ quantity: existingItem[0].quantity + quantity })
          .where(eq(cartItems.id, existingItem[0].id));
      } else {
        // Tambahkan produk baru ke cart
        await db.insert(cartItems).values({
          cartId: cartId,
          productId: productId,
          quantity: quantity,
        });
      }

      return res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method ${req.method} not allowed" });
  }
}