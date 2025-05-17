import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { mUser } from 'src/shared/models/User.model';
import { UserService } from 'src/shared/services/user.service';

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

  constructor(private userService: UserService, private route: ActivatedRoute) { }
  user!: mUser
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getMockUser(userId).subscribe(data => {
        if (data) {
          this.user = data;
        }
      })
    }
  }
}
