import { Component, OnInit } from '@angular/core';
import { OrderUser } from 'src/app/interfaces/cartUser.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sales = 0;
  cantOrders = 0;
  constructor(private orderSerice: OrderService) {}
  ngOnInit(): void {
    this.orderSerice.getOrders().subscribe((orders) => {
      this.sales = this.getSales(orders);
      this.cantOrders = orders.length;
    });
  }

  //Obtiene las ganacias
  getSales(orders: OrderUser[]) {
    return orders.reduce((acc, current) => {
      return acc + current.pagoTotal;
    }, 0);
  }
}
