import { Component, OnInit } from '@angular/core';
import { mUser } from 'src/shared/models/User.model';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  constructor(private userService: UserService) { }
  user?: mUser
  ngOnInit() {
    this.userService.getMockUser("u1").subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

}
