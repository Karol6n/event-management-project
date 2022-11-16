import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { pipe } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { EventsFormBuilder } from '../../config/events-form.builder';
import { MapAddAddressComponent } from '../../components/address-search-map.component';
import { PlaceSearchResult } from '../../components/place-autocomplete.component';

@Component({
  selector: 'app-add',
  templateUrl: './events-add-page.component.html',
  styleUrls: ['./events-add-page.component.scss'],
})

export class EventsAddComponent {
  locationValue: PlaceSearchResult = { address: ''};
  events = EventsFormBuilder.eventForm();
  categoryList: string[]=['Imprezy', 'Komedia', 'Sport']


  constructor(private authService: AuthService, private dataService: DataService, private router: Router, private toast: HotToastService) { }

  submit() {
    this.dataService
    .addEvent(this.events.value)
      this.toast.observe({
        success: 'Gratulacje, dodałeś nowe wydarzenie!',
        loading: 'Trwa dodawanie wydarzenia',
        error: ({ message }) => `${message}`,
      });
      this.router.navigate(['/events']);
  }
}
