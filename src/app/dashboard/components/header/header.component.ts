import { Component } from '@angular/core';
import { user } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user!: user;
  constructor(private authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  onLogout() {
    this.authService.logout();
  }
}
