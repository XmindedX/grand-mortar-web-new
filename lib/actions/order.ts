'use server';

import { db } from '@/database/drizzle';
import { carts } from '@/database/schema';
import { orders, orderItems, cartItems, products } from '@/database/schema';
import { eq, and, sql } from 'drizzle-orm';
import { orderSchema } from '@/lib/validations';
import { cookies } from 'next/headers';

export async function createOrder(formData: OrderParams, itemsData: OrderItemsParams) {
  const cartId = db
    .select()
    .from(carts)
    .where(eq(carts.userId, formData.userId))
    .limit(1)
  if (!cartId) throw new Error('Cart not found');
try {
  //Generate trxId
  const newTrxId = "TRX-" + Math.floor(Math.random() * 1000000);

  // Cek duplikasi trxId
  const existingTrxId = await db
    .select()
    .from(orders)
    .where(eq(orders.trxId, newTrxId as any))
    .limit(1);

  if (existingTrxId.length > 0) {
    const newTrxId = "TRX-" + Math.floor(Math.random() * 1000000);
  }
  // Create order
  const order = await db
    .insert(orders)
    .values({
      userId: formData.userId,
      trxId: newTrxId,
      customer: formData.customer,
      number: formData.number,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      total: 0,
      piutang: 0,
    })
    .returning()

  // Get cart items
  const cart = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, formData.userId))

  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cart[0].id))

  // Create order items and calculate total
  let total = 0
  let piutang = 0
  for (const item of items) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, item.productId))

    await db.insert(orderItems)
    .values({
      orderId: order[0].id,
      productId: item.productId,
      quantity: item.quantity,
    })

    total =  product.price * item.quantity
    piutang = product.price * item.quantity
  }

  // Update order total
  await db
    .update(orders)
    .set({ total, piutang })
    .where(eq(orders.id, order[0].id))

  // Clear cart
  await db.delete(cartItems).where(eq(cartItems.cartId, cart[0].id))
  await db.delete(carts).where(eq(carts.id, cart[0].id))

  return order
} catch (error) {
  console.error('Error adding order:', error);
}
}

export async function getOrders() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('cartId')?.value;
  if (!userId) return [];

  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt);
}

export async function getOrderById(id: string) {
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .then(res => res[0]);

  const items = await db
    .select({
      id: orderItems.id,
      productId: products.id,
      name: products.title,
      price: products.price,
      quantity: orderItems.quantity,
      image: products.image
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, id));

  return { ...order, items };
}