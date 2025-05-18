import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Comment } from 'src/shared/models/Comment.model';
import { Post } from 'src/shared/models/Post.model';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    FormsModule,
  ]
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  comments!: Comment[];
  post!: Post;
  isAuthenticated = false;
  newCommentText = '';
  loggedInUser!: User;
  categoryName!:string;

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('pid');
    this.categoryName = this.route.snapshot.paramMap.get('id')!;
    if (postId) {
      this.subscription.add(this.apiService.getPostById(postId).subscribe(data => {
        if (data) {
          this.post = data;
        }
      }));

      this.subscription.add(this.apiService.getCommentsByPostId(postId).subscribe(data => {
        this.comments = data;
      }));
    }
    this.subscription.add(this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    }));

    this.subscription.add(
      this.authService.user$.subscribe(data => {
        if (data) {
          this.loggedInUser = data
        }
      })
    )
  }
  submitComment() {
    if (!this.newCommentText.trim() || !this.post || !this.authService.user$) return;

    this.subscription.add(this.authService.user$.subscribe(user => {
      if (!user) return;
      const newComment: Comment = {
        creator_id: user._id!,
        creator_nickname: user.nickname!,
        post_id: this.post._id!,
        text: this.newCommentText
      }
      this.apiService.createComment(newComment).subscribe(comment => {
        this.comments.push(comment);
        this.newCommentText = '';
      });
    }));
  }

  deletePost(postId: string) {
    if (confirm('Biztosan törlöd ezt a posztot?')) {
      this.subscription.add(this.apiService.deletePost(postId).subscribe({
        next: () => {
          this.router.navigate(['/topic',this.categoryName]);
         },
        error: (err) => {
          console.error('Hiba törlés közben:', err);
        }
      }));
    }
  }

  deleteComment(commentId: string) {
    if (confirm('Biztosan törlöd ezt a posztot?')) {
      this.subscription.add(this.apiService.deleteComment(commentId).subscribe({
        next: () => {
          this.comments = this.comments.filter(c => c._id !== commentId);
        },
        error: (err) => {
          alert('Failed to delete comment');
        }
      }));
    }
  }
}
