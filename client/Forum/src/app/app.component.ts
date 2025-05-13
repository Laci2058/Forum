import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  IonMenuButton} from '@ionic/angular/standalone';
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

  constructor() {
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

  ngOnInit() {
  }
}
