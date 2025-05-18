import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/shared/models/Post.model';
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
  private apiSubsribe!: Subscription;
  private authSubscribe!: Subscription;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,) { }
  ngOnDestroy(): void {
    this.apiSubsribe.unsubscribe()
    this.authSubscribe.unsubscribe()
  }

  ngOnInit() {
    this.apiSubsribe = this.apiService.selectedCategory$.subscribe(category => {
      if (category) {
        this.categoryName = category.category_name;
        this.categoryId = category._id!
        this.apiService.getPostsByCategory(this.categoryId).subscribe(data => {
          this.posts = data;
        });
      }
    });

    this.authSubscribe = this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

}
