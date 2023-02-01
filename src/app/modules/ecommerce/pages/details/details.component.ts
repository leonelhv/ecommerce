import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { DialogCantidadProductoComponent } from 'src/app/shared/components/dialog-cantidad-producto/dialog-cantidad-producto.component';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.product = params as any;
    });
  }

  onOpenOverlay(product: Product) {
    this.overlayService.open(DialogCantidadProductoComponent, { ...product });
  }
}
