import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const r = inject(Router);
  return inject(AuthService).checkAuth().pipe(map(isAuthenticated => {
    if (!isAuthenticated) {
      r.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }), catchError(error => {
    console.log(error);
    r.navigateByUrl('/login');
    return of(false);
  }));
};
