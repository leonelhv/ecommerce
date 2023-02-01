import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { DialogCantidadProductoComponent } from 'src/app/shared/components/dialog-cantidad-producto/dialog-cantidad-producto.component';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent {
  @Input() product!: Product;

  constructor(private overlayService: OverlayService) {}

  onOpenOverlay(product: Product) {
    this.overlayService.open(DialogCantidadProductoComponent, { ...product });
  }
}
