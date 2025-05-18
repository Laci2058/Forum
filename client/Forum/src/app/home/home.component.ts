import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Category } from 'src/shared/models/Category.model';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class HomeComponent  implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { }
  categories?: Category[];
  ngOnInit() {
   this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  navigateToTopics(category: Category) {
  this.categoryService.setCategoryId(category._id);
  this.router.navigate(['/topics',category.category_name]);
  
}

}
