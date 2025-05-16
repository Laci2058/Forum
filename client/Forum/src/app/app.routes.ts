import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent) },
  //TODO: settings
];
