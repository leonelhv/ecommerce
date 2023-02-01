import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderUser } from 'src/app/interfaces/cartUser.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  order!: OrderUser;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.route.params.subscribe((params) => {
      const uid = params['uid'];
      this.orderService.getOrderByUID(uid).subscribe((order) => {
        this.order = order[0] as OrderUser;
      });
    });
  }
}
