interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
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
    customer: string;
    number: string;
    email: string;
    alamat: string;
    productList: {
      id: string;
      title: string;
      quantity: number;
    }[];
  }
  
  interface OrderParams {
    customer: string;
    number: string;
    email: string;
    alamat: string;
    productList: {
      id: string;
      title: string;
      quantity: number;
    }[];
  }
  