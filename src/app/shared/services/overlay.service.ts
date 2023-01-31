import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayRef: any;
  constructor(private overlay: Overlay) {}

  open(component: any, data?: any) {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    const componentRef = this.overlayRef.attach(new ComponentPortal(component));
    if (data) {
      componentRef.instance.dataOverlay = data;
    }
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  private getOverlayPosition(): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return positionStrategy;
  }
  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }
}
