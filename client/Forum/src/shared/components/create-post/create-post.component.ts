import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private subscription = new Subscription();

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router,) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  user!: User
  ngOnInit() {
    this.subscription.add(this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user
      }
    }))
    this.subscription.add(this.apiService.selectedCategory$.subscribe(category => {
      if (category) {
        this.category = category;
      }
    }))
  }
  post: Partial<Post> = {
    title: '',
    text: ''
  };

  onSubmit() {
    const newPost: Post = {
      creator_id: this.user._id!,
      creator_nickname: this.user.nickname,
      category_id: this.category._id!,
      title: this.post.title!,
      text: this.post.text!
    };

    this.subscription.add(this.apiService.createPost(newPost).subscribe({
      next: (data) => {
        this.router.navigate(['/topic', this.category.category_name, data._id])
      }
    }))
  }
}
