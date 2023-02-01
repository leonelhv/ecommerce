import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userInfo } from 'src/app/interfaces/auth.interface';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  infoUser!: userInfo;
  cart!: CartUser[];
  totalPagar = 0;

  constructor(
    private ecommerceService: EcommerceService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.cart = this.ecommerceService.getCartLocalStorage();
    this.totalPagar = this.calcularPago();
    this.infoUser = JSON.parse(localStorage.getItem('user')!);
  }
  calcularPago() {
    return this.cart.reduce((acc, current) => {
      return acc + current.subtotal;
    }, 0);
  }

  onBuyProducts() {
    const newOrder = {
      uid: uuidv4(),
      email: this.infoUser.email!,
      products: this.cart,
      pagoTotal: this.totalPagar,
    };
    this.orderService.addOrderUser(newOrder);
    localStorage.removeItem('cart');
    this.toastr.success('Gracias por su compra 🎉', 'Pedido Realizado');
    this.router.navigate(['']);
  }
}
