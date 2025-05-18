import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Category } from 'src/shared/models/Category.model';
import { Post } from 'src/shared/models/Post.model';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';

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
export class CreatePostComponent implements OnInit, OnDestroy {

  category!: Category
  private authSubscribe!: Subscription;
  private apiSubscribe!: Subscription;
  private apiSubmitSubscribe!: Subscription;

  constructor(private apiService: ApiService, private authService: AuthService, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.apiSubscribe.unsubscribe()
    this.authSubscribe.unsubscribe()
    this.apiSubmitSubscribe.unsubscribe()
  }
  user!: User
  ngOnInit() {
    this.authSubscribe = this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user
      }
    })
     this.apiSubscribe = this.apiService.selectedCategory$.subscribe(category => {
      if (category) {
        this.category = category;
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
      creator_id: this.user._id!,
      creator_nickname: this.user.nickname,
      category_id: this.category._id!,
      title: this.post.title!,
      text: this.post.text!
    };

    this.apiSubmitSubscribe = this.apiService.createPost(newPost).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }
}
