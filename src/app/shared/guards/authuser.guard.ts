import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { user } from 'src/app/interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthuserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user) {
      return this.router.createUrlTree(['auth/login']);
    }

    return this.authService.getRolUser(user.email).pipe(
      map((res: any) => {
        const rol = res[0].rol;

        if (rol === 'user') {
          return true;
        } else {
          return this.router.createUrlTree(['auth/login']);
        }
      }),
      catchError(() => of(this.router.createUrlTree(['auth/login'])))
    );
  }
}
