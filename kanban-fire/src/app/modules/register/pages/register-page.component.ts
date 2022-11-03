
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UsersService } from 'src/app/services/user-service/user.service';
import { RegisterFormBuilder } from '../config/register-form.builder';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent {
  newUser = RegisterFormBuilder.registered();
  hide = true;

  constructor(private authService : AuthService, private router: Router, private toast: HotToastService, private usersService: UsersService) { }

  get firstName() {
    return this.newUser.get('firstName');
  }

  get lastName() {
    return this.newUser.get('lastName');
  }

  get email() {
    return this.newUser.get('email');
  }

  get password() {
    return this.newUser.get('password');
  }

  get confirmPassword() {
    return this.newUser.get('confirmPassword');
  }

  submit() {
    const { firstName, lastName, email, password } = this.newUser.value;

    if (!this.newUser.valid || !firstName || !lastName || !password || !email) {
      return;
    }

    this.authService
      .register(firstName, lastName, email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
      this.usersService.addUser({ uid, email, firstName, lastName, displayName: firstName,  })
    ),
        this.toast.observe({
          success: 'Rejestracja powiodła się!',
          loading: 'Trwa rejestracja...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}

