import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of, delay, map } from 'rxjs';
import { MOCK_CATEGORIES, MOCK_POST } from 'src/shared/mock-data/mock-data';
import { mPost } from 'src/shared/models/Post.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  imports:[
    IonicModule,
    CommonModule
  ]
})
export class CategoryDetailsComponent implements OnInit {

  categoryId: string | null = null;
  posts!: mPost[]
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = id;
      this.getPostsByCategory(this.categoryId).subscribe(data => {
        this.posts = data;
      });
    }
  }

  getPostsByCategory(categoryId: string) {
    return of(MOCK_POST).pipe(
      delay(100),
      map(posts => posts.filter(post => post.category_id === categoryId))
    );
  }

}
