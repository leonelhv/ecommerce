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
import { Observable } from 'rxjs';
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

  getOrderByUID(uid: string) {
    const productRef = collection(this.firestore, 'orders');
    const colQuery = query(productRef, where('uid', '==', uid));
    return collectionData(colQuery);
  }
  getOrders(): Observable<OrderUser[]> {
    const productRef = collection(this.firestore, 'orders');
    return collectionData(productRef, { idField: 'id' }) as Observable<
      OrderUser[]
    >;
  }
}
