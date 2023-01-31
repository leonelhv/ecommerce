import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css'],
})
export class EcommerceComponent {
  @ViewChild(NavbarComponent) settings!: NavbarComponent;

  hideSettings() {
    this.settings.onHideSettings();
  }
}
