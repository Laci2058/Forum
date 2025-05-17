import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of, delay, map } from 'rxjs';
import { MOCK_CATEGORIES, MOCK_POST } from 'src/shared/mock-data/mock-data';
import { mPost } from 'src/shared/models/Post.model';
import { PostService } from 'src/shared/services/post.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  imports:[
    IonicModule,
    CommonModule,
    RouterLink
  ]
})
export class CategoryDetailsComponent implements OnInit {

  categoryId: string | null = null;
  posts!: mPost[]
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = id;
      this.postService.getPostsByCategory(this.categoryId).subscribe(data => {
        this.posts = data;
      });
    }
  }

}
