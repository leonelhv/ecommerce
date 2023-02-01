import { Component } from '@angular/core';
import { OrderUser } from 'src/app/interfaces/cartUser.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders!: OrderUser[];

  constructor(private orderService: OrderService) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.orderService.getOrdersUser(user.email).subscribe((orders) => {
      this.orders = orders as OrderUser[];
    });
  }
}
