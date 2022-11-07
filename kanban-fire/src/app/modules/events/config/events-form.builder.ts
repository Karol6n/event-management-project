import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export class EventsFormBuilder {
  static eventForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      createDate: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }
}
