import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthuserGuard } from 'src/app/shared/guards/authuser.guard';
import { EcommerceComponent } from './ecommerce.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthuserGuard],
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthuserGuard],
      },
      {
        path: 'order-detail/:uid',
        component: OrderDetailComponent,
        canActivate: [AuthuserGuard],
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceRoutingModule {}
