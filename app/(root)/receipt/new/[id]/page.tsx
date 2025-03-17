import { db } from '@/database/drizzle'
import { orders, orderItems, products } from '@/database/schema'
import { eq } from 'drizzle-orm'
import ReceiptForm  from '@/components/ReceiptForm'

const CreateReceipt = async ({ params }: { params: { id: string } }) => {
  const orderId = params?.id;
  if (!orderId) return <p className="text-red-500 text-center">Invalid Order ID</p>;

  // Get order details
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .then(res => res[0]);

  if (!order) return <p className="text-red-500 text-center">Order not found</p>;

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
    .where(eq(orderItems.orderId, order.id));

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Buat Receipt untuk Order #{order.trxId}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white shadow-md p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Detail Order</h2>
          <h3 className="mb-5 text-gray-700 font-medium">Customer: {order.customer || 'Unknown'}</h3>

          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-600">{item.quantity} x Rp. {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-gray-800 font-semibold">Rp. {(item.price * item.quantity).toLocaleString('id-ID')}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t font-semibold text-gray-800">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="text-lg">Rp. {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Piutang:</span>
              <span>Rp. {(order.piutang || 0).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Receipt Form */}
        <div className="bg-white shadow-md p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Buat Receipt</h2>
          <ReceiptForm 
            userId={order.userId as string}
            orderId={order.id}
            customer={order.customer as string}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateReceipt;