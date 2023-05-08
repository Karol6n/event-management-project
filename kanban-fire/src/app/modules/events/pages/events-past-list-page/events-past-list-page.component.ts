import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RawEvent } from 'src/app/models/events.interface';
import { User } from 'src/app/models/role-user.interface';
import { getAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data-service/data.service';
import { EventsFormBuilder } from '../../config/events-form.builder';

@Component({
  selector: 'app-view',
  templateUrl: './events-past-list-page.component.html',
  styleUrls: ['./events-past-list-page.component.scss'],
})

export class EventsPastListPageComponent implements OnInit {
  auth = getAuth();
  events = EventsFormBuilder.eventForm();
  eventsList: RawEvent[] = [];
  joinedEvents: RawEvent[] = [];
  myEvents: RawEvent[] = [];
  user = this.auth.currentUser;
  userId = this.auth.currentUser?.uid;
  constructor(private route: ActivatedRoute, private dataService: DataService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc<User>(uid).get();
  }

  getAllEvents() {
    this.events.value.dateOfEvent = new Date();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.dataService.getAllEvents()
      .pipe(
        map(res => res.filter((e: any) => e.payload.doc.data().dateOfEvent.toDate() < today))
      )
      .subscribe({
        next: (res) => {
          this.eventsList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            this.getUserData(data.uid).subscribe((user: any) => {
              data.firstName = user.data().firstName;
              data.lastName = user.data().lastName;
            });
            return data;
          });
          this.myEvents = this.eventsList.filter(event => event.uid === this.userId);
          this.joinedEvents = this.eventsList.filter(event => event.guests.includes(this.userId));
        },
        error: (err) => {
          alert('Wystąpił błąd, odśwież przeglądarkę')
        }
      });
    }
}
