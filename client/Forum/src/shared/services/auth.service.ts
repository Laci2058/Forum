import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authState.asObservable();
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    
    return this.http.post('http://localhost:5000/app/login', body, { headers: headers, withCredentials: true }).pipe(
    tap(() => this.authState.next(true))
  );
     
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'}).pipe(
    tap(() => this.authState.next(false))
  );
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', { withCredentials: true }).pipe(
      tap(isAuth => this.authState.next(isAuth)),
      catchError(() => {
        this.authState.next(false);
        return of(false);
      })
    );
  }
}