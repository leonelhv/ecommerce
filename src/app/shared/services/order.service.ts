import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { OrderUser } from 'src/app/interfaces/cartUser.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  addOrderUser(order: OrderUser) {
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, order);
  }

  getOrdersUser(email: string) {
    const productRef = collection(this.firestore, 'orders');
    const colQuery = query(productRef, where('email', '==', email));
    return collectionData(colQuery);
  }
}
