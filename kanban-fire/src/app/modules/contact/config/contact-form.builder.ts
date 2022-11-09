import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ContactFormBuilder {
  static contact(): FormGroup {
    return new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }
}
