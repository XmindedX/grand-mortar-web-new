import { db } from '@/database/drizzle';
import { orders, orderItems, products } from '@/database/schema';
import { eq, inArray } from 'drizzle-orm';
import ReceiptForm from '@/components/ReceiptForm';
import { notFound } from 'next/navigation';

// Change to use SearchParams instead of route params
const CreateMultiReceipt = async ({ searchParams }: { searchParams: { ids?: string } }) => {
    // Get IDs from query params
    const idsParam = searchParams.ids;
    
    if (!idsParam) return <p className="text-red-500 text-center">No Order IDs provided</p>;
    
    // Parse and validate IDs
    const orderIds = idsParam
      .split(",")
      .map(id => id.trim())
      .filter(id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
    if (orderIds.length === 0) 
      return <p className="text-red-500 text-center">Invalid Order IDs</p>;

    // Fetch orders
    const orderList = await db.select().from(orders).where(inArray(orders.id, orderIds));

    if (!orderList || orderList.length === 0) 
      return notFound();

    // Fetch order items with product details
    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productName: products.title,
        price: products.price,
        quantity: orderItems.quantity,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(inArray(orderItems.orderId, orderIds));

    // Group items by order ID
    const groupedItems = items.reduce((acc: Record<string, typeof items[number][]>, item) => {
        if (!item.orderId) return acc; // Avoid errors if orderId is null
        if (!acc[item.orderId]) acc[item.orderId] = [];
        acc[item.orderId].push(item);
        return acc;
      }, {});
      

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Buat Receipt untuk Beberapa Order</h1>

        {orderList.map(order => {
          const orderItems = groupedItems[order.id] || [];
          const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return (
            <div key={order.id} className="bg-white shadow-md p-6 rounded-lg border mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order #{order.trxId}</h2>
              <h3 className="mb-5 text-gray-700 font-medium">Customer: {order.customer || 'Unknown'}</h3>

              <div className="space-y-4 mb-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x Rp. {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-gray-800 font-semibold">
                      Rp. {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
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

              {/* Receipt Form */}
              <div className="mt-4">
                <ReceiptForm 
                  userId={order.userId || ''} 
                  orderId={order.id} 
                  customer={order.customer || 'Unknown'} 
                />
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default CreateMultiReceipt;