import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database/drizzle';
import { carts, cartItems } from '@/database/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method ${req.method} not allowed' });
  }

  const { userId, productId, quantity } = req.body;

  try {
    // Cari atau buat keranjang untuk user
    const [cart] = await db
      .insert(carts)
      .values({ ...req.body, userId })
      .onConflictDoUpdate({
        target: carts.userId,
        set: { userId },
      })
      .returning();

    // Tambahkan item ke keranjang
    await db.insert(cartItems).values({
      cartId: cart.id,
      ...req.body,
      productId,
      quantity,
    });

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
}