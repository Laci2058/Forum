import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { MOCK_USER } from '../mock-data/mock-data';
import { User } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getMockUser(uid: string) {
    return of(MOCK_USER).pipe(
      map(users => users.find(user => user.user_id === uid))
    );
  }
  getUserById(userId: string): Observable<User | null> {
  const body = { userId };

  return this.http.post<User>('http://localhost:5000/app/getUserById', body, { withCredentials: true }).pipe(
    catchError(err => {
      return of(null);
    })
  );
}
}
