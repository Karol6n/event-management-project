import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService} from 'src/app/services/data-service/data.service';
import { EventsFormBuilder } from '../../config/events-form.builder';
import { Event } from 'src/app/models/events.interface';
@Component({
  selector: 'app-list',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss'],
})

export class EventsListComponent implements OnInit {

  eventsList: Event[] = [];
  events = EventsFormBuilder.eventForm();

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.getAllEvents();
   }

   getAllEvents() {

    this.dataService.getAllEvents().subscribe(res => {

      this.eventsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }
}
