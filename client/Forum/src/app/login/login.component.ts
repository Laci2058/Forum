import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;

  private authSubscribe!: Subscription;

  constructor(private router: Router, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.authSubscribe.unsubscribe()
  }

  login() {
    this.isLoading = true;
    if (this.email && this.password) {
      this.errorMessage = '';
      this.authSubscribe = this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.isLoading = false;
            this.router.navigateByUrl('/topics');
          }
        }, error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      })
    } else {
      this.isLoading = false;
      this.errorMessage = 'Form is empty.';
    }
  }

}
