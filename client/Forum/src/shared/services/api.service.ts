import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { User } from '../models/User.model';
import { Post } from '../models/Post.model';
import { Category } from '../models/Category.model';
import { Comment } from '../models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private selectedCategory = new BehaviorSubject<Category | null>(null);
    selectedCategory$ = this.selectedCategory.asObservable();
    
  constructor(private http: HttpClient) { }
  /* user */
  getUserById(userId: string): Observable<User | null> {
      const body = { userId };
  
      return this.http.post<User>('http://localhost:5000/app/getUserById', body, { withCredentials: true }).pipe(
        catchError(err => {
          return of(null);
        })
      );
    }

    /* post */
      createPost(post: Post) {
    const body = new URLSearchParams();
    body.set('creator_id', post.creator_id);
    body.set('creator_nickname', post.creator_nickname);
    body.set('category_id', post.category_id);
    body.set('title', post.title);
    body.set('text', post.text);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/createPost', body, { headers: headers, withCredentials: true });
  }

  getPostsByCategory(categoryId: string): Observable<Post[]> {
    const body = { categoryId }
    return this.http.post<Post[]>('http://localhost:5000/app/getPostsByCategory', body , {
      withCredentials: true
    });
  }

  getPostById(postId: string): Observable<Post | null> {
    const body = { postId }

    return this.http.post<Post>('http://localhost:5000/app/getPostById', body, {
      withCredentials: true
    }).pipe(
      catchError(err => {
        console.error('Hiba a post lekérdezésekor:', err);
        return of(null);
      })
    );
  }

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    const body = { postId }
    return this.http.post<Comment[]>('http://localhost:5000/app/getCommentsByPostId', body, {
      withCredentials: true
    });
  }

  /* category */

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5000/app/getAllCategories', {
      withCredentials: true
    });

  }
  setCategoryId(category: Category) {
    this.selectedCategory.next(category);
  }
}
