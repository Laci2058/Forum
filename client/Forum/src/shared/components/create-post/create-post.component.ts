import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Post } from 'src/shared/models/Post.model';
import { User } from 'src/shared/models/User.model';
import { AuthService } from 'src/shared/services/auth.service';
import { PostService } from 'src/shared/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class CreatePostComponent implements OnInit {

  catId!: string | null;
  constructor(private postService: PostService, private authService: AuthService, private route: ActivatedRoute) {
    this.catId = this.route.snapshot.paramMap.get('id');
  }
  user!: User
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user
      }
    })

  }
  post: Partial<Post> = {
    title: '',
    text: ''
  };

  onSubmit() {
    console.log(this.user);
    
    const newPost: Post = {
      creator_id: this.user._id,
      creator_nickname: this.user.nickname,
      category_id: this.catId!,
      title: this.post.title!,
      text: this.post.text!
    };
    this.postService.createPost(newPost).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }
}
