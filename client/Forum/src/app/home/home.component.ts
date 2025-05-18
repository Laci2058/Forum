import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Category } from 'src/shared/models/Category.model';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';

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
  private authSubscribe!: Subscription;
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { }
  
  categories?: Category[];
  loggedInUser!: User
  ngOnInit() {
    this.apiSubscribe = this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
    })

    this.authSubscribe = this.authService.user$.subscribe(data => {
      if (data) {
        this.loggedInUser = data
      }
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
