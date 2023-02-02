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
export class AuthenticatedGuard implements CanActivate {
  user!: user;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.user = JSON.parse(localStorage.getItem('user')!);
      if (this.user) {
        this.authService.getRolUser(this.user.email).subscribe((res: any) => {
          const rol = res[0].rol;
          if (rol === 'admin') {
            resolve(this.router.navigate(['dashboard']));
          } else if (rol === 'user') {
            resolve(this.router.navigate(['/']));
          }
        });
      } else {
        resolve(true);
      }
    });
  }
}
