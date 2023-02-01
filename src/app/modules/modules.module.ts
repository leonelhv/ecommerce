import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@NgModule({
  imports: [],
  exports: [AuthModule, EcommerceModule],
})
export class ModulesModule {}
