
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/auth.service';
import { RegisterFormBuilder } from '../config/register-form.builder';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent {
  newUser = RegisterFormBuilder.registered();
  hide = true;

  constructor(private authService : AuthService, private router: Router, private toast: HotToastService) { }

  get name() {
    return this.newUser.get('name');
  }

  get surname() {
    return this.newUser.get('surname');
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
    const { name, surname, email, password } = this.newUser.value;

    if (!this.newUser.valid || !name || !surname || !password || !email) {
      return;
    }

    this.authService
      .register(name, surname, email, password)
      .pipe(
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

