import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Comment } from 'src/shared/models/Comment.model';
import { Post } from 'src/shared/models/Post.model';
import { PostService } from 'src/shared/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class PostDetailsComponent implements OnInit {
  constructor(private postService: PostService, private route: ActivatedRoute) { }
  comments!: Comment[];
  post!: Post

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('pid');
    if (postId) {
      this.postService.getPostById(postId).subscribe(data => {
        if (data) {
          this.post = data;
        }
      });

      this.postService.getCommentsByPostId(postId).subscribe(data => {
        this.comments = data;
        console.log('Comments:', data);
      });
    }
  }
}
