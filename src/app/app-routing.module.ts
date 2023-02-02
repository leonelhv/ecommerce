import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthadminGuard } from './shared/guards/authadmin.guard';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthenticatedGuard],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthadminGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/ecommerce/ecommerce.module').then(
        (m) => m.EcommerceModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
