import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  Firestore,
} from '@angular/fire/firestore';
import { collection, doc, updateDoc } from '@firebase/firestore';
import { Observable, of } from 'rxjs';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  cartUser: CartUser[] = [];

  constructor(private firestore: Firestore) {
    this.getCartLocalStorage().subscribe((res) => {
      this.cartUser = res;
    });
  }
  //Obtiene el carrito desde el localstorage
  getCartLocalStorage(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('cart') || '[]'));
  }

  //Guarda el carrito en el localstorage
  saveCartLocalStorage(cart: CartUser[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  //Agrega un producto a firebase
  addproduct(Product: Partial<Product>) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, Product);
  }

  //Obtiene todos los productos
  getProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  //Elimina el producto en firebase
  deleteProduct(Product: Product) {
    const productRef = doc(this.firestore, `products/${Product.id}`);
    return deleteDoc(productRef);
  }

  //Para actualizar el producto aun no implementado en el dashboard
  updateProduct(id: string, Product: Product) {
    const productRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productRef, { ...Product });
  }
}
