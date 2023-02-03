import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'src/app/interfaces/auth.interface';
import { CartUser } from 'src/app/interfaces/cartUser.interface';
import { AuthService } from '../../services/auth.service';
import { EcommerceService } from '../../services/ecommerce.service';
import { MenuContextualService } from '../../services/menu-contextual.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  infoUser!: userInfo | null;
  showSettings = false;
  displayMenuMobile = false;
  cart!: CartUser[];
  subtotal: number = 0;
  cantProduct: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private popupService: MenuContextualService,
    private viewContainerRef: ViewContainerRef,
    private ecommerceService: EcommerceService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    this.getDataCart();
  }

  getDataCart() {
    this.ecommerceService.getCartLocalStorage().subscribe((res) => {
      this.cart = res;
      this.calcularPago();
      this.calcularCantidadProductos();
    });
  }

  calcularPago() {
    this.subtotal = this.cart.reduce((acc, current) => {
      return acc + current.subtotal;
    }, 0);
  }

  calcularCantidadProductos() {
    this.cantProduct = this.cart.reduce((acc, current) => {
      return acc + current.cantidad;
    }, 0);
  }

  //Muestra el menú settings
  onShowSettings() {
    this.showSettings = !this.showSettings;
  }

  //Oculta el menú settings
  onHideSettings() {
    if (this.showSettings) {
      this.onShowSettings();
    }
  }

  //Menu mobile
  onMenuMobile() {
    this.displayMenuMobile = !this.displayMenuMobile;
  }

  //Cierra Sesión del usuario
  onLogout() {
    this.authService.logout().then((res) => {
      localStorage.removeItem('user');
      window.location.reload();
    });
  }

  onOpenCart(origin: any, menu: any) {
    this.getDataCart();
    this.popupService
      .open(origin, menu, this.viewContainerRef, {
        data: this.cart,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
