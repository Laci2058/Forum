import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
export class ProfileDetailsComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService) { }
  user!: User
  ngOnInit() {
    this.authService.user$.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
  }
}
