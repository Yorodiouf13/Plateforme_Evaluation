import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.authService.getUser()).pipe(
      take(1),
      map(user => {
        if (user) {
          // Vérifier le rôle de l'utilisateur
          const requiredRole = next.data['role'];
          if (user.role === requiredRole) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
