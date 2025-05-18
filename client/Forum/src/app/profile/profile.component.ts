import { Component, OnInit } from '@angular/core';
import { mUser } from 'src/shared/models/User.model';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  constructor(private apiService: ApiService) { }
  user?: mUser
  ngOnInit() {/*
    this.apiService.getMockUser("u1").subscribe(data => {
      this.user = data;
      console.log(data);
    })*/
  }

}
