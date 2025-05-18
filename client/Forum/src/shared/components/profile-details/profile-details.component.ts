import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { mUser } from 'src/shared/models/User.model';
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
  user!: mUser
  ngOnInit() {
    /*const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.apiService.getMockUser(userId).subscribe(data => {
        if (data) {
          this.user = data;
        }
      })
    }*/
  }
}
