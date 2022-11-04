import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ForgotPasswordFormBuilder {
  static passwordReset(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
