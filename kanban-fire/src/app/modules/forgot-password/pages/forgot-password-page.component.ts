import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ForgotPasswordFormBuilder } from '../config/forgot-password-form.builder';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordComponent {

  passwordReset = ForgotPasswordFormBuilder.passwordReset();

  constructor(private AuthService: AuthService, private router: Router, private toast: HotToastService) { }

  get email() {
    return this.passwordReset.get('email');
  }

  submit() {
    const { email } = this.passwordReset.value;

    if(!this.passwordReset.value || !email) {
      return;
    }

    this.AuthService
    .forgotPassword(email)
    .pipe(
      this.toast.observe({
        success: 'Wysłano maila, sprawdź swoją skrzynkę!',
        loading: 'Wysyłanie prośby...',
        error: ({ message }) => `${message}`,
      })
    )
    .subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
