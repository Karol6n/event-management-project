import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RawEvent } from 'src/app/models/events.interface';
import { User } from 'src/app/models/role-user.interface';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './events-details-view-page.component.html',
  styleUrls: ['./events-details-view-page.component.scss'],
})

export class EventsDetailViewComponent implements OnInit {
  eventId: string;
  event: RawEvent;
  guests: User[] = [];
  constructor(private route: ActivatedRoute, private dataService: DataService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.dataService.getEventDoc(this.eventId).subscribe((event: RawEvent) => {
      this.event = event;
      if (event.guests) {
        for (const guestUid of event.guests) {
          this.getUserData(guestUid).subscribe((user: User) => {
            this.guests.push(user);
          });
        }
      }
    });
  }

   getUserData(uid: string) {
    return this.firestore.collection('users').doc<User>(uid).valueChanges();
  }

}
