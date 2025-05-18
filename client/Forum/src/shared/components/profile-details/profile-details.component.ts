import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class ProfileDetailsComponent implements OnInit,OnDestroy {

  private authSubscribe!: Subscription;
  private apiSubscribe!: Subscription;
  private routeSubscribe!: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }
  ngOnDestroy(): void {
    this.apiSubscribe.unsubscribe()
    this.authSubscribe.unsubscribe()
    this.routeSubscribe.unsubscribe()
  }

  user!: User
  loggedInUser!: User

  ngOnInit() {
    this.routeSubscribe = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getUserById(id).subscribe(data => {
          if (data) {
            this.user = data
          }
        })
      }
    });
    this.authSubscribe = this.authService.user$.subscribe(data => {
      if (data) {
        this.loggedInUser = data
      }
    })
  }

  deleteUser(userId: string) {
    if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
      this.apiSubscribe = this.apiService.deleteUser(userId).subscribe({
        next: () => alert('User deleted'),
        error: (err) => console.error(err)
      });
    }
  }

}
