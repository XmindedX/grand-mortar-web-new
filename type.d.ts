interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
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
  