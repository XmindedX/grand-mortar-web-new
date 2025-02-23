"use server"

import { products } from "@/database/schema";
import { carts } from "@/database/schema";
import { cartItems } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createCart = async (cartData: CartsParams, cartItem: CartItemsParams) => {
    const { userId } = cartData;
    const { cartId, productId, quantity } = cartItem;
    
      try {
        // Cari atau buat cart untuk user
        const cart = await db
          .insert(carts)
          .values({ 
            ...cartData,
          }).onConflictDoUpdate({
            target: carts.userId,
            set: { ...cartData },
          })
          .returning();

        // Add item to cart
        const item = await db
          .insert(cartItems)
          .values({
            ...cartItem,
            cartId: cart[0].id,
          }).onConflictDoUpdate({
            target: cartItems.cartId && cartItems.productId,
            set: { quantity: cartItem.quantity },
          })
          .returning();
          return {
            success: true,
          }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
};

export const getCartItems = async (userId: any) => {
  try {
    // Get keranjang user
    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));

    if (userCart.length === 0) {
      return [];
    }

    // Get item keranjang
    const cartItemsData = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cartId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        productImage: products.image,
        productName: products.title,
        productPrice: products.price,
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, userCart[0].id));

    return cartItemsData;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};