import { Routes } from '@angular/router';
import { authGuard } from 'src/shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  
  {
    path: 'topics/:id/submit',
    loadComponent: () => import('../shared/components/create-post/create-post.component').then((c) => c.CreatePostComponent),
  },
  {
    path: 'topics/:id/:pid',
    loadComponent: () => import('../shared/components/post-details/post-details.component').then((c) => c.PostDetailsComponent),
  },
  {
    path: 'topics/:id',
    loadComponent: () => import('../shared/components/category-details/category-details.component').then((c) => c.CategoryDetailsComponent),
  },
  {
    path: 'topics',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'profiles/:id',
    loadComponent: () => import('../shared/components/profile-details/profile-details.component').then((c) => c.ProfileDetailsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent), canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'home' }
  //TODO: settings
];
