import { Component } from '@angular/core';
import { DialogCantidadProductoComponent } from 'src/app/shared/components/dialog-cantidad-producto/dialog-cantidad-producto.component';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent {
  constructor(private overlayService: OverlayService) {}

  onOpenOverlay() {
    this.overlayService.open(DialogCantidadProductoComponent, 'holaaaaaaaaaaa');
  }
}
