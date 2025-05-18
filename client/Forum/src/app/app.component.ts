import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane, IonApp, IonAvatar, IonBadge, IonButtons, IonTitle, IonToolbar, IonHeader,
  IonMenuButton
} from '@ionic/angular/standalone';
import {
  homeOutline,
  notificationsOutline,
  folderOutline,
  cubeOutline,
  personOutline,
  settingsOutline,
  logOutOutline,
  personCircleOutline
} from 'ionicons/icons';
import { AuthService } from 'src/shared/services/auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonAvatar, IonApp,
    CommonModule,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
    RouterLink,
    RouterLinkActive,
    IonMenuButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      'home-outline': homeOutline,
      'notifications-outline': notificationsOutline,
      'folder-outline': folderOutline,
      'cube-outline': cubeOutline,
      'person-outline': personOutline,
      'settings-outline': settingsOutline,
      'log-out-outline': logOutOutline,
      'person-circle-outline': personCircleOutline
    });
  }
  isAuthenticated: boolean = false;

  ngOnInit() {
  this.authService.checkAuth().subscribe();

  this.authService.isAuthenticated$.subscribe(isAuth => {
    this.isAuthenticated = isAuth;
  });
}
  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
