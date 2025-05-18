import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/models/User.model';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    IonicModule
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(private authService: AuthService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  user!: User

  ngOnInit() {
    this.subscription.add(this.authService.user$.subscribe(data => {
      if (data) {
        this.user = data;
        console.log(data);
        
      }
    })
    )
  }
}
