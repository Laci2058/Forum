import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
export class CategoryDetailsComponent implements OnInit {

  categoryName: string | null = null;
  categoryId!: string;
  posts!: Post[];
  showInput = false;
  newPostTitle = '';
  isAuthenticated = false;
  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,) { }

  ngOnInit() {

    this.apiService.selectedCategory$.subscribe(category => {
      if (category) {
        this.categoryName = category.category_name;
        this.categoryId = category._id!
        this.apiService.getPostsByCategory(this.categoryId).subscribe(data => {
          this.posts = data;
        });
      }
    });

    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

}
