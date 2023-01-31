import { Component } from '@angular/core';
import { DialogCantidadProductoComponent } from 'src/app/shared/components/dialog-cantidad-producto/dialog-cantidad-producto.component';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private overlayService: OverlayService) {
    this.overlayService.open(DialogCantidadProductoComponent, 'holaaaaaaaaaaa');
  }
}
