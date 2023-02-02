import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { user } from 'src/app/interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthadminGuard implements CanActivate {
  user: user;
  isAdmin = false;
  constructor(private authService: AuthService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    if (this.user) {
      this.authService.getRolUser(this.user.email).subscribe((res: any) => {
        const rol = res[0].rol;

        if (rol === 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAdmin) {
      return true;
    } else {
      return this.router.navigate(['auth/login']);
    }
  }
}
