import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ProfileFormBuilder {
  static profile(): FormGroup {
    return new FormGroup({
      uid: new FormControl(''),
      displayName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
    });
  }
}
