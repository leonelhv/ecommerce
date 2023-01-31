import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EcommerceComponent } from './ecommerce.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [HomeComponent, EcommerceComponent, ProductsComponent, DetailsComponent, CartComponent],
  imports: [CommonModule, EcommerceRoutingModule, SharedModule],
  exports: [EcommerceComponent],
})
export class EcommerceModule {}
