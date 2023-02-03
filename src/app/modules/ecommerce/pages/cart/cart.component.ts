import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userInfo } from 'src/app/interfaces/auth.interface';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { v4 as uuidv4 } from 'uuid';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  infoUser!: userInfo;
  cart!: CartUser[];
  totalPagar = 0;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private ecommerceService: EcommerceService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.ecommerceService.getCartLocalStorage().subscribe((res) => {
      this.cart = res;
    });
    this.totalPagar = this.calcularPago();
    this.infoUser = JSON.parse(localStorage.getItem('user')!);
  }
  ngOnInit(): void {
    this.initConfig();
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AZ8xrjfuHVjEWRvzGBc_aFeaZ4fDW0TIxbIRD4a0blKATRKLc08XNG02zebUjNGpLUgwu-TjmIitTigV',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          purchase_units: [
            {
              description: this.infoUser.email + 'pago por compras',
              amount: {
                currency_code: 'USD',
                value: `${this.totalPagar}`,
              },
            },
          ],
        },
      advanced: {
        extraQueryParams: [{ name: 'disable-funding', value: 'credit,card' }],
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          this.onBuyProducts();
        });
      },

      onError: (err) => {
        this.toastr.error(
          'No se pudo realizar la compra',
          'Error en la compra'
        );
      },
    };
  }
}
