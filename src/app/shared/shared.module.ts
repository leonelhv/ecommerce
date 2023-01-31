import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogCantidadProductoComponent } from './components/dialog-cantidad-producto/dialog-cantidad-producto.component';

@NgModule({
  declarations: [NavbarComponent, DialogCantidadProductoComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [NavbarComponent],
})
export class SharedModule {}
