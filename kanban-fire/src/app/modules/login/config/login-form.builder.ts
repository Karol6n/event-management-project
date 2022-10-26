import { FormControl, FormGroup, Validators } from '@angular/forms';
export class LoginFormBuilder {
  static loggedIn(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
