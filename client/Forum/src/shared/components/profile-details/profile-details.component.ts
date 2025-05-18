import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';

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

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  user!: User
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getUserById(id).subscribe(data => {
          if (data) {
            this.user = data
          }
        })
      }
    });
  }
}
