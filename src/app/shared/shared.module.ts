import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogCantidadProductoComponent } from './components/dialog-cantidad-producto/dialog-cantidad-producto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, DialogCantidadProductoComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
