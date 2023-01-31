import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

@NgModule({
  declarations: [DashboardComponent, ProductsComponent, AddProductComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
