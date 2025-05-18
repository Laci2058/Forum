import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {
  private apiSubscribe!: Subscription;

  constructor(private apiService: ApiService, private router: Router) { }
  
  categories?: Category[];
  ngOnInit() {
    this.apiSubscribe = this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  navigateToTopics(category: Category) {
    this.apiService.setCategoryId(category);
    this.router.navigate(['/topic', category.category_name]);

  }

  ngOnDestroy(): void {
    this.apiSubscribe.unsubscribe();
  }

}
