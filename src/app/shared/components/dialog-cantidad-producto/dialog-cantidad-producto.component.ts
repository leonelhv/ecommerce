import { Component, Input } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-dialog-cantidad-producto',
  templateUrl: './dialog-cantidad-producto.component.html',
  styleUrls: ['./dialog-cantidad-producto.component.css'],
})
export class DialogCantidadProductoComponent {
  @Input() dataOverlay: any;
  constructor(private overlayService: OverlayService) {}

  onCloseOverlay() {
    this.overlayService.close();
  }
}
