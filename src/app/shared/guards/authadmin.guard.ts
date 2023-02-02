import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { user } from 'src/app/interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthadminGuard implements CanActivate {
  user!: user;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.user = JSON.parse(localStorage.getItem('user')!);
      if (this.user) {
        this.authService.getRolUser(this.user.email).subscribe((res: any) => {
          const rol = res[0].rol;
          if (rol === 'admin') {
            resolve(true);
          } else {
            resolve(this.router.navigate(['auth/login']));
          }
        });
      } else {
        resolve(this.router.navigate(['auth/login']));
      }
    });
  }
}
