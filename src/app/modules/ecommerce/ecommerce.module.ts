import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EcommerceComponent } from './ecommerce.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHeroComponent } from './components/carousel-hero/carousel-hero.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { CardCartComponent } from './components/card-cart/card-cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RouterLink } from '@angular/router';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { NgxPayPalModule } from 'ngx-paypal';
//overlay
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
@NgModule({
  declarations: [
    HomeComponent,
    EcommerceComponent,
    ProductsComponent,
    DetailsComponent,
    CartComponent,
    CarouselHeroComponent,
    CardProductComponent,
    OrdersComponent,
    CardCartComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule,
    CarouselModule,
    OverlayModule,
    PortalModule,
    RouterLink,
    NgOptimizedImage,
    NgxPayPalModule,
  ],
  exports: [EcommerceComponent],
})
export class EcommerceModule {}
