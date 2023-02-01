import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { OverlayService } from '../../services/overlay.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '../../services/ecommerce.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dialog-cantidad-producto',
  templateUrl: './dialog-cantidad-producto.component.html',
  styleUrls: ['./dialog-cantidad-producto.component.css'],
})
export class DialogCantidadProductoComponent {
  @Input() dataOverlay!: Product;

  formCantidad!: FormGroup;

  constructor(
    private overlayService: OverlayService,
    private fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  onCloseOverlay() {
    this.overlayService.close();
  }

  saveProductToLocalStorage() {
    this.formCantidad.markAllAsTouched();
    if (this.formCantidad.valid) {
      let subtotal = 0;
      const cartUSer = this.ecommerceService.getCartLocalStorage();
      const cantidad = this.formCantidad.value.cantidad;
      const { offer, price } = this.dataOverlay;

      //Evalua el subtotal según si hay oferta
      if (offer > 0) {
        subtotal = offer * cantidad;
      } else {
        subtotal = price * cantidad;
      }

      const newItem: any = {
        ...this.dataOverlay,
        cantidad,
        subtotal,
      };
      delete newItem.description;

      const newCart = [...cartUSer, newItem];

      this.ecommerceService.saveCartLocalStorage(newCart);
      this.toastr.success('Producto añadido al carrito', 'Producto Agregado');
      this.overlayService.close();
    }
  }

  private initForm() {
    this.formCantidad = this.fb.group({
      cantidad: [, [Validators.required, Validators.min(1)]],
    });
  }
  get form() {
    return this.formCantidad.controls;
  }

  campoNoValido(campo: string) {
    return (
      this.formCantidad.get(campo)?.invalid &&
      this.formCantidad.get(campo)?.touched
    );
  }
}
