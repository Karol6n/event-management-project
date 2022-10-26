
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/auth.service';
import { LoginFormBuilder } from '../config/login-form.builder';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent {
  user = LoginFormBuilder.loggedIn();
  hide = true;

  constructor(private authService : AuthService, private router: Router, private toast: HotToastService) { }

  get email() {
    return this.user.get('email');
  }
  get password() {
    return this.user.get('password');
  }
  submit() {
    const { email, password } = this.user.value;

    if (!this.user.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Zalogowano!',
          loading: 'Logowanie...',
          error: () => `Login lub hasło niepoprawne `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }
}
