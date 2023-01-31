import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showSettings = false;
  displayMenuMobile = false;
  constructor() {}

  //Muestra el menú settings
  onShowSettings() {
    this.showSettings = !this.showSettings;
  }

  //Oculta el menú settings
  onHideSettings() {
    if (this.showSettings) {
      this.onShowSettings();
    }
  }

  onMenuMobile() {
    this.displayMenuMobile = !this.displayMenuMobile;
  }
}
