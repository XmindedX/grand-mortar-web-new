
import { db } from '@/database/drizzle'
import { orders, orderItems, products } from '@/database/schema'
import { eq } from 'drizzle-orm'
import ReceiptForm  from '@/components/ReceiptForm'

const CreateReceipt = async ({ params }: { params: { id: string } }) => {
  const orderId = (await params).id;
  // Get order details
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .then(res => res[0])

  // Get order items with product details
  const items = await db
    .select({
      id: orderItems.id,
      productName: products.title,
      price: products.price,
      quantity: orderItems.quantity,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, order?.id));

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) 
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Buat Receipt untuk Order #{order?.trxId}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Detail Order</h2>
          <h3 className="mb-5">Customer: {order.customer}</h3>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x {(item.price)}
                  </p>
                </div>
                <div>Rp. {(item.price * item.quantity).toLocaleString('id-ID')}</div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>Rp. {(subtotal).toLocaleString('id-ID')}</span>
            </div>
            
            <div className="flex justify-between font-bold">
              <span>Piutang:</span>
              <span>Rp. {(order.piutang).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Receipt Form */}
        <ReceiptForm 
          userId={order?.userId as string}
          orderId={order?.id}
          customer={order?.customer as string}

        />
      </div>
    </div>
  )
}

export default CreateReceipt