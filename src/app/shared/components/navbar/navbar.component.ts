import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'src/app/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  infoUser!: userInfo | null;
  showSettings = false;
  displayMenuMobile = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.infoUser = JSON.parse(localStorage.getItem('user')!);
  }

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

  //Menu mobile
  onMenuMobile() {
    this.displayMenuMobile = !this.displayMenuMobile;
  }

  //Cierra Sesión del usuario
  onLogout() {
    this.authService.logout().then((res) => {
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
    });
  }
}
