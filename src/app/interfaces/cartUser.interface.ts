export interface CartUser {
  id: string;
  image: string;
  offer: number;
  price: number;
  title: string;
  cantidad: number;
  subtotal: number;
}

export interface OrderUser {
  uid: string;
  email: string;
  products: ProductOrder[];
  pagoTotal: number;
}

interface ProductOrder extends CartUser {}
