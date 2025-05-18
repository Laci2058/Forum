import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Category } from 'src/shared/models/Category.model';
import { ApiService } from 'src/shared/services/api.service';

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

  constructor(private apiService: ApiService, private router: Router) { }
  categories?: Category[];
  ngOnInit() {
   this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  navigateToTopics(category: Category) {
  this.apiService.setCategoryId(category);
  this.router.navigate(['/topics',category.category_name]);
  
}

}
