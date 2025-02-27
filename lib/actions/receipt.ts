// src/lib/actions/receipts.ts
'use server'

import { db } from '@/database/drizzle'
import { receipts, orders } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const createReceipt = async (receiptData: ReceiptParams) => {
  const user = receiptData.userId
  if (!user) throw new Error('Unauthorized - Pengguna belum login')

  try {

    //Generate nomor receipt
    const newReceiptNumber = "RC-" + Math.floor(Math.random() * 1000000)

    // Cek duplikasi nomor receipt
    const existingReceipt = await db
      .select()
      .from(receipts)
      .where(eq(receipts.receiptNumber, newReceiptNumber as any))
      .limit(1)

    if (existingReceipt.length > 0) {
      const newReceiptNumber = "RC-" + Math.floor(Math.random() * 1000000)
    }

    // Buat receipt baru
    const [newReceipt] = await db
      .insert(receipts)
      .values({
        ...receiptData,
        receiptNumber: newReceiptNumber,
      })
      .returning()

    // Update piutang order
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, receiptData.orderId))
      .then(res => res[0])

    const newPiutang = order.piutang - receiptData.nominal
    await db
      .update(orders)
      .set({ piutang: newPiutang })
      .where(eq(orders.id, receiptData.orderId))

    // if piutang is negative
    if (newPiutang < 0) {
        await db
          .update(orders)
          .set({ piutang: 0 })
          .where(eq(orders.id, receiptData.orderId))
      }

    // Check if piutang is 0
    if (newPiutang === 0) {
      await db
        .update(orders)
        .set({ status: 'Lunas' })
        .where(eq(orders.id, receiptData.orderId))
    }

    return {
      success: true,
      data: newReceipt
    }
    
  } catch (error) {
    console.error('Gagal membuat receipt:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal membuat receipt'
    }
  }
}