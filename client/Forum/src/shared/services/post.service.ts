import { Injectable } from '@angular/core';
import { of, delay, map } from 'rxjs';
import { MOCK_COMMENTS, MOCK_POST } from '../mock-data/mock-data';
import { mPost } from '../models/Post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: mPost) {
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

  getPostsByCategory(categoryId: string) {
    return of(MOCK_POST).pipe(
      delay(100),
      map(posts => posts.filter(post => post.category_id === categoryId))
    );
  }
  getPostById(postId: string) {
    return of(MOCK_POST).pipe(
      delay(20),
      map(posts => posts.find(post => post.post_id === postId))
    );
  }
  getCommentsByPostId(postId: string) {
    return of(MOCK_COMMENTS).pipe(
      delay(20),
      map(comments => comments.filter(comment => comment.post_id === postId))
    );
  }
}
