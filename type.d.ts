interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
  }

interface userParams {
    userId: string;
  }

interface Carts {
    id: string;
    userId: string;
  }

interface CartsParams {
    id: string;
    userId: string;
  }

interface CartItems {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
  }

interface CartItemsParams {
    cartId: string;
    productId: string;
    quantity: number;
  }
  
  interface AuthCredentials {
    name: string;
    email: string;
    password: string;
  }
  
  interface ProductParams {
    title: string;
    price: number;
    stock: number;
    image: string;
  }

  interface Order {
    id: string;
    userId: string;
    customer: string;
    number: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: number;
  }
  
  interface OrderParams {
    id: string;
    userId: string;
    customer: string;
    number: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: number;
  }

  interface OrderItems {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
  }
  
  interface OrderItemsParams {
    orderId: string;
    productId: string;
    quantity: number;
  }

  interface Receipt {
    id: string;
    userId: string;
    orderId: string;
    receiptNumber: string;
    nominal: number;
    customer: string;
  }
  
  interface ReceiptParams {
    userId: string;
    orderId: string;
    nominal: number;
    customer: string;
  }
  