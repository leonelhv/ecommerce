import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    FormProductComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
