import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Comment } from 'src/shared/models/Comment.model';
import { Post } from 'src/shared/models/Post.model';
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
export class PostDetailsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute) { }
  comments!: Comment[];
  post!: Post;
  isAuthenticated = false;
  newCommentText = '';

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('pid');
    if (postId) {
      this.apiService.getPostById(postId).subscribe(data => {
        if (data) {
          this.post = data;
        }
      });

      this.apiService.getCommentsByPostId(postId).subscribe(data => {
        this.comments = data;
      });
    }
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }



  submitComment() {
    if (!this.newCommentText.trim() || !this.post || !this.authService.user$) return;

    this.authService.user$.subscribe(user => {
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
    });
  }
}
