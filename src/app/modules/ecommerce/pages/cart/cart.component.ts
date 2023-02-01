import { Component } from '@angular/core';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart!: CartUser[];
  totalPagar = 0;

  constructor(private ecommerceService: EcommerceService) {
    this.cart = this.ecommerceService.getCartLocalStorage();
    this.totalPagar = this.calcularPago();
  }

  calcularPago() {
    return this.cart.reduce((acc, current) => {
      return acc + current.subtotal;
    }, 0);
  }
}
