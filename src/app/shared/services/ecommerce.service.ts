import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  Firestore,
} from '@angular/fire/firestore';
import { collection, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  cartUser: CartUser[] = [];

  constructor(private firestore: Firestore) {
    this.cartUser = this.getCartLocalStorage();
  }

  getCartLocalStorage() {
    const getCartLocalStorage = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    return getCartLocalStorage;
  }

  saveCartLocalStorage(cart: CartUser[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addproducts(Product: Partial<Product>) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, Product);
  }

  getProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  deleteProduct(Product: Product) {
    const productRef = doc(this.firestore, `products/${Product.id}`);
    return deleteDoc(productRef);
  }

  updateProduct(id: string, Product: Product) {
    const productRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productRef, { ...Product });
  }
}
