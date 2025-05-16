import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { mCategory } from 'src/shared/models/Category.model';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
  ]
})
export class HomeComponent  implements OnInit {

  constructor(private categoryService: CategoryService) { }
  categories?: mCategory[];
  ngOnInit() {
   this.categoryService.getMockCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }

}
