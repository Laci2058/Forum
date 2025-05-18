import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, IonicModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;

  private authSubscribe!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    this.authSubscribe.unsubscribe()
  }

  login() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;

      this.authSubscribe = this.authService.login(email, password).subscribe({
        next: (data) => {
          if (data) {
            this.isLoading = false;
            this.router.navigateByUrl('/topic-list');
          }
        },
        error: (err) => {
          this.errorMessage = 'Hibás email vagy jelszó.';
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Kérlek töltsd ki az összes mezőt helyesen.';
      this.loginForm.markAllAsTouched();
    }
  }
  get emailControl() { return this.loginForm.get('email'); }
  get passwordControl() { return this.loginForm.get('password'); }

  getEmailErrorMessage() {
    if (this.emailControl?.hasError('required')) {
      return 'The email address is required';
    }
    if (this.emailControl?.hasError('email')) {
      return 'Please, type a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.passwordControl?.hasError('required')) {
      return 'The password is required';
    }
    return '';
  }

}
