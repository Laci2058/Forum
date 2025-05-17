import { Injectable } from '@angular/core';
import { of, delay, map } from 'rxjs';
import { MOCK_COMMENTS, MOCK_POST } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

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
