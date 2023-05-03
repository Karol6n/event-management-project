import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export class EventsFormBuilder {
  static eventForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      uid: new FormControl(''),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      location: new FormControl(''),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      description: new FormControl('', Validators.required),
      dateOfEvent: new FormControl('', Validators.required),
      hourOfEvent: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', [Validators.required, Validators.min(1)]),
      limit: new FormControl(''),
      freeOrPaid: new FormControl('', Validators.required),
      costOfTicket: new FormControl('',  Validators.min(1)),
      linkToTicket: new FormControl(''),
      typeOfEvent: new FormControl(''),
      dressCode: new FormControl(''),
    });
  }
}

