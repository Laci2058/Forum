import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/shared/models/User.model';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports:[
    IonicModule
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user!: User
  ngOnInit() {
    this.authService.user$.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
  }

}
