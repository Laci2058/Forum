import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/shared/models/Post.model';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterLink
  ]
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {

  categoryName: string | null = null;
  categoryId!: string;
  posts!: Post[];
  showInput = false;
  newPostTitle = '';
  isAuthenticated = false;

  private subscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  loggedInUser!: User;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.loadPosts();
    });

    this.subscription.add(this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    })
    )
  }
  
  loadPosts() {
    this.subscription.add(
      this.apiService.selectedCategory$.subscribe(category => {
        if (category) {
          this.categoryName = category.category_name;
          this.categoryId = category._id!
          this.apiService.getPostsByCategory(this.categoryId).subscribe(data => {
            this.posts = data;
          });
        }
      })
    )
  }

}
