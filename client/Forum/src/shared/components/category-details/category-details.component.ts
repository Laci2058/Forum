import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Post } from 'src/shared/models/Post.model';
import { AuthService } from 'src/shared/services/auth.service';
import { CategoryService } from 'src/shared/services/category.service';
import { PostService } from 'src/shared/services/post.service';

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

  categoryId: string | null = null;
  posts!: Post[]
  showInput = false;
  newPostTitle = '';
  isAuthenticated = false;
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryService.selectedCategoryId$.subscribe(id => {
        if (id) {
          this.categoryId = id;
          this.postService.getPostsByCategory(this.categoryId).subscribe(data => {
            this.posts = data;
          });
        }
      })

    });

    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

}
