import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mComment } from 'src/shared/models/Comment.model';
import { PostService } from 'src/shared/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports:[
    CommonModule
  ]
})
export class PostDetailsComponent implements OnInit {
  constructor(private postService: PostService, private route: ActivatedRoute) { }
  comments!: mComment[];

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('pid');
    if (postId) {
      this.postService.getCommentsByPostId(postId).subscribe(data => {
        this.comments = data;
        console.log('Comments:', data);
      });
    }
  }
}
