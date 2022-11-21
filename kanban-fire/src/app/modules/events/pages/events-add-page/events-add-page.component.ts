import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { EventsFormBuilder } from '../../config/events-form.builder';
import { PlaceSearchResult } from '../../components/place-autocomplete.component';
import { UsersService } from 'src/app/services/user-service/user.service';
import { getAuth } from "firebase/auth";


@Component({
  selector: 'app-add',
  templateUrl: './events-add-page.component.html',
  styleUrls: ['./events-add-page.component.scss'],
})

export class EventsAddComponent {
  locationValue: PlaceSearchResult = { address: ''};
  newEvent = EventsFormBuilder.eventForm();
  categoryList: string[]=['Imprezy', 'Komedia', 'Sport']
  dressCodeList: string[]=['luźny', 'biznesowy', 'formalny', 'sportowy']
  todayDate: Date = new Date()
  selectedValue: string = '';
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(
    private dataService: DataService,
    private router: Router,
    private toast: HotToastService,) {}

  submit() {
    this.newEvent.value.location = this.locationValue.address;
    const uid = this.user?.uid;
    this.newEvent.value.uid = uid;
    this.dataService
    .addEvent(this.newEvent.value).then(res=>{

      this.toast.success("Gratulacje! Twoje wydarzenie zostało dodane")
    })
  .catch(err=>{
    this.toast.error("Wystąpił błąd")
  })
  this.router.navigate(['/events']);
}
}
