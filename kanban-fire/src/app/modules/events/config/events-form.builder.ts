import { FormControl, FormGroup, Validators } from '@angular/forms';
export class EventsFormBuilder {
  static eventForm(): FormGroup {
    return new FormGroup({
      eid: new FormControl(''),
      uid: new FormControl(''),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateOfEvent: new FormControl('', Validators.required),
      hourOfEvent: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', [Validators.required, Validators.min(1)]),
      freeOrPaid: new FormControl('', Validators.required),
      costOfTicket: new FormControl('', [Validators.required, Validators.min(1)]),
      linkToTicket: new FormControl('', Validators.required),
      typeOfEvent: new FormControl(''),
      dressCode: new FormControl(''),
    });
  }
}
