import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const requiredRole = route.data['requiredRole'];

  return authService.checkAuth().pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
        return of(false);
      }

      if (!requiredRole) return of(true);

      const user = authService.getCurrentUser();
      if (user && user.role === requiredRole) {
        return of(true);
      }

      router.navigateByUrl('/unauthorized');
      return of(false);
    }),
    catchError((err) => {
      console.error(err);
      router.navigateByUrl('/login');
      return of(false);
    })
  );
};
