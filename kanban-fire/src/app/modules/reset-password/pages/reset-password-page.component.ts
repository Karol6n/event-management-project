import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UsersService } from 'src/app/services/user-service/user.service';
import { ResetPasswordFormBuilder } from '../config/reset-password-form.builder';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordComponent {
  resetPassword = ResetPasswordFormBuilder.resetPassword()
  hide = true;

  constructor(private authService : AuthService, private router: Router, private toast: HotToastService, private usersService: UsersService, private route: ActivatedRoute) { }

  get newPassword() {
    return this.resetPassword.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPassword.get('confirmPassword');
  }

  submit() {
    const { newPassword } = this.resetPassword.value;
    const code = this.route.snapshot.queryParams['oobCode'];

    if (!this.resetPassword.valid ||!newPassword) {
      return;
    }

    this.authService
      .resetPassword(code, newPassword)
      .pipe(
        this.toast.observe({
          success: 'Hasło zostało zmienione!',
          loading: 'Trwa zmienianie hasła...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
