// app/api/receipts/batch/route.ts

import { db } from '@/database/drizzle'
import { receipts, orders } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { receipts: receiptsToCreate } = body

    if (!Array.isArray(receiptsToCreate) || receiptsToCreate.length === 0) {
      return NextResponse.json(
        { message: 'Invalid request data: receipts array is required' },
        { status: 400 }
      )
    }

    // Begin transaction to ensure all operations succeed or fail together
    const createdReceipts = await db.transaction(async (tx) => {
      const results = []

      for (const receipt of receiptsToCreate) {
        // Create receipt record
        const [createdReceipt] = await tx
        .insert(receipts)
        .values({
          id: uuidv4(),
          orderId: receipt.orderId,
          userId: receipt.userId,
          customer: receipt.customer,
          receiptNumber: receipt.receiptNumber,
          nominal: receipt.amount,
          createdAt: new Date(),
        })
        .returning()

        // Update order status if full payment
        await tx
          .update(orders)
          .set({ 
            status: 'Lunas',
            piutang: 0, 
          })
          .where(eq(orders.id, receipt.orderId))

        results.push(createdReceipt)
      }

      return results
    })

    return NextResponse.json(
      { message: 'Receipts created successfully', data: createdReceipts },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating batch receipts:', error)
    return NextResponse.json(
      { message: 'Failed to create receipts', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}