import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export class ResetPasswordFormBuilder {
  static resetPassword(): FormGroup {
    return new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),

    },
    { validators: passwordsMatchValidator() });

  }
}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
